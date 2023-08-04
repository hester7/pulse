using Microsoft.Extensions.Options;
using OpenAI_API;
using OpenAI_API.Chat;
using Pulse.Api.Application.Features.Posts.Commands;
using Pulse.Api.Application.Features.Posts.Models;
using Pulse.Api.Application.Features.Users.Commands;
using Pulse.Api.Dapper;
using Pulse.Api.Domain.Models;
using Pulse.Api.Security;

namespace Pulse.Api.Application.Features.Posts;

public sealed class PostsRepository
{
    private readonly DapperExecutor _executor;
    private readonly OpenAIAPI _openAiClient;

    public PostsRepository(DapperExecutor executor, IOptions<OpenAiOptions> openAiOptions)
    {
        _executor = executor;
        _openAiClient = new OpenAIAPI(openAiOptions.Value.ApiKey);
    }

    public async Task<PostWithCommentsResponse?> GetPostWithCommentsAsync(PostWithCommentsRequest request, CancellationToken cancellationToken)
    {
        var postsWithComments = (await _executor.QueryAsync<PostWithComments>(new GetPostWithCommentsCommand(request), cancellationToken)).ToList();
        return postsWithComments.Count != 1 ? null : new PostWithCommentsResponse(postsWithComments.First());
    }

    public async Task<GeneratePostTextResponse> GeneratePostTextAsync(GeneratePostTextRequest request, CancellationToken cancellationToken)
    {
        var (postText, _) = await GeneratePostAndComments(request.Category);
        return new GeneratePostTextResponse(postText);
    }

    public async Task<GeneratePostResponse> GeneratePostAsync(GeneratePostRequest request, CancellationToken cancellationToken)
    {
        var users = (await _executor.QueryAsync<User>(new GetUsersCommand(), cancellationToken)).ToList();

        var (postText, _) = await GeneratePostAndComments();
        var post = new Post
        {
            PostText = postText,
            UserId = GetRandomUser(users).UserId
        };

        await _executor.ExecuteAsync(new InsertPostCommand(post), cancellationToken);

        return new GeneratePostResponse(post);
    }

    public async Task<GenerateCommentsResponse> GenerateCommentsAsync(GenerateCommentsRequest request, CancellationToken cancellationToken)
    {
        var count = Random.Shared.Next(2, 6);
        var comments = new Comment[count];
        var commentsText = await GenerateComments(request.PostText, count);

        var users = (await _executor.QueryAsync<User>(new GetUsersCommand(), cancellationToken)).ToList();

        for (var i = 0; i < commentsText.Length; i++)
        {
            comments[i] = new Comment
            {
                CommentText = commentsText[i],
                PostId = request.PostId,
                UserId = GetRandomUser(users).UserId
            };
        }

        // TODO: use quartz
        foreach (var comment in comments)
        {
            await _executor.ExecuteAsync(new InsertCommentCommand(comment), cancellationToken);
        }

        return new GenerateCommentsResponse(comments);
    }

    public async Task<GenerateLikesResponse> GenerateLikesAsync(GenerateLikesRequest request, CancellationToken cancellationToken)
    {
        var count = Random.Shared.Next(1, 10);
        var likes = new Like[count];

        var users = (await _executor.QueryAsync<User>(new GetUsersCommand(), cancellationToken)).ToList();

        for (var i = 0; i < count; i++)
        {
            likes[i] = new Like
            {
                PostId = request.PostId,
                UserId = GetRandomUser(users).UserId
            };
        }

        // TODO: use quartz
        foreach (var like in likes)
        {
            await _executor.ExecuteAsync(new InsertLikeCommand(like), cancellationToken);
        }

        return new GenerateLikesResponse(likes);
    }

    private static User GetRandomUser(List<User> users)
    {
        var randomUserIndex = Random.Shared.Next(0, users.Count);
        return users[randomUserIndex];
    }

    private async Task<(string PostText, string[] CommentsText)> GeneratePostAndComments(string? category = null, bool generateComments = false)
    {
        var chat = _openAiClient.Chat.CreateConversation(new ChatRequest { Temperature = 0.9 });

        // Give instruction as System
        chat.AppendSystemMessage("You are going to generate a random social media post based on a category. " +
                                 "Your response will only include the post and never an acknowledgement of the request. " +
                                 "The character limit is 480 but try to keep your post between 28 and 140 characters. " +
                                 "Do not wrap the post in any kind of quotes.");

        // Ask it a question
        var promptText = "Create a random social media post";
        if (!string.IsNullOrWhiteSpace(category))
            promptText += $" for \"{category}\"";
        chat.AppendUserInput(promptText);

        // Get the response
        var response = await chat.GetResponseFromChatbotAsync();
        var postText = response;

        if (generateComments)
        {
            var count = Random.Shared.Next(2, 6);
            // Continue the conversation by asking another question
            chat.AppendUserInput($"Create {count} random comments for that random social media post as a single string. " +
                                 "Separate each comment with a \"|\" character. Do not wrap the comments in any kind of quotes.");
            response = await chat.GetResponseFromChatbotAsync();
            var comments = response.Split('|', StringSplitOptions.TrimEntries);
            return (postText, comments);
        }

        return (postText, Array.Empty<string>());
    }

    private async Task<string[]> GenerateComments(string postText, int count)
    {
        var chat = _openAiClient.Chat.CreateConversation(new ChatRequest { Temperature = 0.9 });

        // Give instruction as System
        chat.AppendSystemMessage("You have already generated a random social media post." +
                                 "Now, you are going to generate comments for that post. " +
                                 "Your response will only include the comments and never an acknowledgement of the request. " +
                                 "The comments will be generated as a single string. " +
                                 "Separate each comment with a \"|\" character. " +
                                 "Do not wrap the comments in any kind of quotes.");

        // Ask it a question
        chat.AppendUserInput($"Generate {count} random comments for the following social media post: \"{postText}\"");

        // Get the response
        var response = await chat.GetResponseFromChatbotAsync();
        var comments = response.Split('|', StringSplitOptions.TrimEntries);
        return comments;
    }
}
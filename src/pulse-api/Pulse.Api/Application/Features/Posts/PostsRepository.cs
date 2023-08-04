using Microsoft.Extensions.Options;
using OpenAI_API;
using OpenAI_API.Chat;
using Pulse.Api.Application.Features.Posts.Commands;
using Pulse.Api.Application.Features.Posts.Models;
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

    public async Task<GeneratePostsResponse> GeneratePostsAsync(GeneratePostsRequest request, CancellationToken cancellationToken)
    {
        var posts = new List<Post>();
        for (var i = 0; i < request.Count; i++)
        {
            var (postText, comments) = await GeneratePostAndComments(generateComments: true);
            // TODO: create random number of likes
            // TODO: save to database
        }

        return new GeneratePostsResponse(posts);
    }

    private async Task<(string, string[])> GeneratePostAndComments(string? category = null, bool generateComments = false)
    {
        var chat = _openAiClient.Chat.CreateConversation(new ChatRequest { Temperature = 0.9 });

        // Give instruction as System
        chat.AppendSystemMessage("You are going to generate a random social media post based on a category. " +
                                 "Your response will only include the post and never an acknowledgement of the request. " +
                                 "The character limit is 480 but try to keep your post between 28 and 140 characters.");

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
}
using Pulse.Api.Application.Features.Posts.Commands;
using Pulse.Api.Application.Features.Posts.Models;
using Pulse.Api.Dapper;
using Pulse.Api.Domain.Models;

namespace Pulse.Api.Application.Features.Posts;

public sealed class PostsRepository
{
    private readonly DapperExecutor _executor;

    public PostsRepository(DapperExecutor executor)
    {
        _executor = executor;
    }

    public async Task<PostWithCommentsResponse?> GetPostWithCommentsAsync(PostWithCommentsRequest request, CancellationToken cancellationToken)
    {
        var postsWithComments = (await _executor.QueryAsync<PostWithComments>(new GetPostWithCommentsCommand(request), cancellationToken)).ToList();
        return postsWithComments.Count != 1 ? null : new PostWithCommentsResponse(postsWithComments.First());
    }

    public async Task<GeneratePostTextResponse> GeneratePostTextAsync(GeneratePostTextRequest request, CancellationToken cancellationToken)
    {
        // TODO:

        return new GeneratePostTextResponse("Your generated post");
    }

    public async Task<GeneratePostsResponse> GeneratePostsAsync(GeneratePostsRequest request, CancellationToken cancellationToken)
    {
        // TODO:

        return new GeneratePostsResponse(Enumerable.Empty<Post>());
    }
}
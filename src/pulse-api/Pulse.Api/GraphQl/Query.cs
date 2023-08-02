using Pulse.Api.Application;
using Pulse.Api.Application.Features.Posts.Models;
using Pulse.Api.Application.Features.Users.Models;

namespace Pulse.Api.GraphQl;

[ExtendObjectType(OperationTypeNames.Query)]
internal sealed class Query
{
    // TODO: for this to work from Hasura, the ClientId/ClientSecret must be provided. Also, the current token returned is invalid.
    public async Task<LoginResponse> Login([Service] PulseAppService app,
        [Service] ILogger logger,
        LoginRequest request)
    {
        logger.Information("Query: {Query}; Request: {Request}", nameof(Login), request);

        try
        {
            return await app.Users.Login(request);
        }
        catch (Exception ex)
        {
            logger.Error(ex, "Unhandled exception for Query: {Query}; Request: {Request}", nameof(Login), request);
            throw;
        }
    }

    public async Task<PostWithComments?> GetPostWithComments([Service] PulseAppService app,
        [Service] ILogger logger,
        Guid postId,
        CancellationToken cancellationToken)
    {
        logger.Information("Query: {Query}; PostId: {PostId}", nameof(GetPostWithComments), postId);

        var response = await app.Posts.GetPostWithCommentsAsync(new PostWithCommentsRequest(postId), cancellationToken);
        return response?.PostWithComments;
    }
}
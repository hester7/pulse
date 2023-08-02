using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Pulse.Api.Application;
using Pulse.Api.Application.Features.Posts.Models;
using Pulse.Api.Application.Security;
using Pulse.Api.Endpoints.Filters;
using Pulse.Api.Security;

namespace Pulse.Api.Endpoints;

internal static class PostsEndpoints
{
    public static RouteGroupBuilder MapPosts(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/posts")
            .WithTags("Posts");

        group.MapGet("/{id}",
                async Task<Results<Ok<PostWithCommentsResponse>, NotFound>> ([FromServices] PulseAppService app,
                    [FromServices] ILogger logger,
                    Guid postId,
                    CancellationToken cancellationToken) =>
                {
                    logger.Information("Endpoint: {Endpoint}; Verb: {Verb}; PostId: {PostId}",
                        "/posts/{id}",
                        "GET",
                        postId);

                    return await app.Posts.GetPostWithCommentsAsync(new PostWithCommentsRequest(postId), cancellationToken) is { } response
                        ? TypedResults.Ok(response)
                        : TypedResults.NotFound();
                })
            .AddEndpointFilter<UnhandledExceptionFilter>();

        group.MapPost("/generate-post-text",
                async Task<Ok<GeneratePostTextResponse>> ([FromServices] PulseAppService app,
                    [Service] CurrentUserHttpService currentUserService,
                    [FromServices] ILogger logger,
                    GeneratePostTextRequest request,
                    CancellationToken cancellationToken) =>
                {
                    logger.Information("User: {User}; Endpoint: {Endpoint}; Verb: {Verb}; Request: {Request}",
                        currentUserService.CurrentUser,
                        "/posts/generate-post-text",
                        "POST",
                        request);

                    var response = await app.Posts.GeneratePostTextAsync(request, cancellationToken);
                    return TypedResults.Ok(response);
                })
            .AddEndpointFilter<UnhandledExceptionFilter>()
            .RequireAuthorization(Policies.HasRequiredClaims, Roles.Admin.ToString())
            .RequirePerUserRateLimit();

        group.MapPost("/generate-post",
                async Task<Ok<GeneratePostsResponse>> ([FromServices] PulseAppService app,
                    [Service] CurrentUserHttpService currentUserService,
                    [FromServices] ILogger logger,
                    GeneratePostsRequest request,
                    CancellationToken cancellationToken) =>
                {
                    logger.Information("Endpoint: {Endpoint}; Verb: {Verb}; Request: {Request}",
                        "/posts/generate-post",
                        "POST",
                        request);

                    var response = await app.Posts.GeneratePostsAsync(request, cancellationToken);
                    return TypedResults.Ok(response);
                })
            .AddEndpointFilter<HasuraApiKeyEndpointFilter>()
            .AddEndpointFilter<UnhandledExceptionFilter>()
            .RequirePerUserRateLimit();

        return group;
    }
}
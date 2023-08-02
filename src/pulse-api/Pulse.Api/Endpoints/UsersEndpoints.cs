using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Pulse.Api.Application;
using Pulse.Api.Application.Features.Users.Models;
using Pulse.Api.Application.Security;
using Pulse.Api.Endpoints.Filters;
using Pulse.Api.Security;

namespace Pulse.Api.Endpoints;

internal static class UsersEndpoints
{
    public static RouteGroupBuilder MapUsers(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/users")
            .WithTags("Users");

        group.MapPost("/generate",
                async Task<Ok<GenerateUsersResponse>> ([FromServices] PulseAppService app,
                    [Service] CurrentUserHttpService currentUserService,
                    [FromServices] ILogger logger,
                    GenerateUsersRequest request,
                    CancellationToken cancellationToken) =>
                {
                    logger.Information("User: {User}; Endpoint: {Endpoint}; Verb: {Verb}; Request: {Request}",
                        currentUserService.CurrentUser,
                        "/users/generate",
                        "POST",
                        request);

                    var response = await app.Users.GenerateAsync(request, cancellationToken);
                    return TypedResults.Ok(response);
                })
            .AddEndpointFilter<UnhandledExceptionFilter>()
            .RequireAuthorization(Policies.HasRequiredClaims, Roles.Admin.ToString());

        return group;
    }
}
using Microsoft.AspNetCore.Authorization;

namespace Pulse.Api.Security;

internal sealed class AdminAuthHandler : AuthorizationHandler<AdminRequirement>
{
    private readonly CurrentUserHttpService _currentUserService;

    public AdminAuthHandler(CurrentUserHttpService currentUserService)
    {
        _currentUserService = currentUserService;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, AdminRequirement requirement)
    {
        if (_currentUserService.CurrentUser.IsAdmin)
            context.Succeed(requirement);

        return Task.CompletedTask;
    }
}

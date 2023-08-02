using Pulse.Api.Application.Security;

namespace Pulse.Api.Security;

internal sealed class CurrentUserHttpService
{
    public CurrentUserHttpService(IHttpContextAccessor httpContextAccessor)
    {
        var context = httpContextAccessor.HttpContext;
        if (context?.User.Identity is { IsAuthenticated: true })
        {
            var userIdClaim = context.User.FindFirst(Claims.UserId);
            var userNameClaim = context.User.FindFirst(Claims.UserName);
            var emailClaim = context.User.FindFirst(Claims.Email);
            var rolesClaims = context.User.FindAll(Claims.Roles);

            var roles = new List<Roles>();

            foreach (var rolesClaim in rolesClaims)
            {
                if (Enum.TryParse<Roles>(rolesClaim.Value, true, out var role))
                    roles.Add(role);
            }

            CurrentUser = new CurrentUser(userIdClaim?.Value ?? string.Empty,
                userNameClaim?.Value ?? string.Empty,
                emailClaim?.Value ?? string.Empty,
                roles.ToArray());
        }
    }

    public CurrentUser CurrentUser { get; private set; } = new();
}
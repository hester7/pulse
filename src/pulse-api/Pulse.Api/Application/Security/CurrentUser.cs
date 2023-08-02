namespace Pulse.Api.Application.Security;

public sealed record CurrentUser(string UserId, string Name, string Email, Roles[] Roles)
{
    public CurrentUser() : this(string.Empty, string.Empty, string.Empty, Array.Empty<Roles>())
    {
    }

    public bool IsAdmin => Roles.Contains(Security.Roles.Admin);
}

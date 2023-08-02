namespace Pulse.Api.Security;

public static class SecurityExtensions
{
    public static Auth0Options GetAuth0Options(this WebApplicationBuilder builder)
    {
        builder.Services.Configure<Auth0Options>(builder.Configuration.GetSection("Auth0"));
        var auth0Options = new Auth0Options();
        builder.Configuration.GetSection("Auth0").Bind(auth0Options);
        return auth0Options;
    }
}
namespace Pulse.Api.Security;

public sealed class Auth0Options
{
    public Auth0Options()
    {
    }

    public Auth0Options(string audience,
        string authority,
        string database,
        string domain,
        string webAppClientId,
        string webAppClientSecret,
        string m2mClientId,
        string m2mClientSecret)
    {
        Audience = audience;
        Authority = authority;
        Database = database;
        Domain = domain;
        WebAppClientId = webAppClientId;
        WebAppClientSecret = webAppClientSecret;
        M2mClientId = m2mClientId;
        M2mClientSecret = m2mClientSecret;
    }

    public string Audience { get; init; } = string.Empty;
    public string Authority { get; init; } = string.Empty;
    public string Database { get; init; } = string.Empty;
    public string Domain { get; init; } = string.Empty;
    public string WebAppClientId { get; init; } = string.Empty;
    public string WebAppClientSecret { get; init; } = string.Empty;
    public string M2mClientId { get; init; } = string.Empty;
    public string M2mClientSecret { get; init; } = string.Empty;
}
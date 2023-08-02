namespace Pulse.Api.Security;

public sealed class HasuraOptions
{
    public HasuraOptions()
    {
    }

    public HasuraOptions(string apiKey)
    {
        ApiKey = apiKey;
    }

    public string ApiKey { get; init; } = string.Empty;
}

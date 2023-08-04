namespace Pulse.Api.Security;

public sealed class OpenAiOptions
{
    public OpenAiOptions()
    {
    }

    public OpenAiOptions(string apiKey)
    {
        ApiKey = apiKey;
    }

    public string ApiKey { get; init; } = string.Empty;
}

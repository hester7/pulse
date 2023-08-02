namespace Pulse.Api.Application;

public sealed record PulseAppServiceOptions
{
    internal string ConnectionString { get; set; } = string.Empty;

    public PulseAppServiceOptions UseConnectionString(string connectionString)
    {
        ConnectionString = connectionString;
        return this;
    }
}
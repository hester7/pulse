using Microsoft.Extensions.Options;
using Pulse.Api.Security;

namespace Pulse.Api.Endpoints.Filters;

internal sealed class HasuraApiKeyEndpointFilter : IEndpointFilter
{
    private const string hasuraApiKey = "x-hasura-api-key";
    private readonly IOptions<HasuraOptions> _hasuraOptions;

    public HasuraApiKeyEndpointFilter(IOptions<HasuraOptions> hasuraOptions)
    {
        _hasuraOptions = hasuraOptions;
    }

    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        if (!context.HttpContext.Request.Headers.TryGetValue(hasuraApiKey, out var apiKeyHeader) || apiKeyHeader != _hasuraOptions.Value.ApiKey)
            return TypedResults.Forbid();

        return await next(context);
    }
}
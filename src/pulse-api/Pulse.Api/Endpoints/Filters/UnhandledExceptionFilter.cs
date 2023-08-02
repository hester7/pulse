using System.Text.Json;
using Pulse.Api.Application.Extensions;

namespace Pulse.Api.Endpoints.Filters;

public class UnhandledExceptionFilter : IEndpointFilter
{
    private readonly ILogger _logger;

    public UnhandledExceptionFilter(ILogger logger)
    {
        _logger = logger;
    }

    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        try
        {
            return await next(context);
        }
        catch (Exception ex)
        {
            var request = context.HttpContext.Request;
            var path = request.Path.Value;
            var method = request.Method;
            var routeValues = JsonSerializer.Serialize(request.RouteValues);
            var queryString = JsonSerializer.Serialize(request.Query);

            _logger.Error(
                ex,
                "Unhandled exception for request '{Path}' {Method}; Route Values: {RouteValues}; Query String: {QueryString}",
                path,
                method,
                routeValues,
                queryString);

            const string title = "Unhandled exception";
            var errors = new Dictionary<string, string[]> { { title, ex.GetExceptionMessages() } };
            return Results.ValidationProblem(errors, statusCode: StatusCodes.Status500InternalServerError, title: title);
        }
    }
}

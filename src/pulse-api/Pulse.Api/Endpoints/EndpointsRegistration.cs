namespace Pulse.Api.Endpoints;

internal static class EndpointsRegistration
{
    public static void MapEndpoints(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapPosts();
        endpointRouteBuilder.MapUsers();
    }
}

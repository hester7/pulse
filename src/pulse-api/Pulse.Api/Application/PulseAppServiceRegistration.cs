using Pulse.Api.Application.Features.Posts;
using Pulse.Api.Application.Features.Users;
using Pulse.Api.Dapper;
using Pulse.Api.GraphQl;

namespace Pulse.Api.Application;

public static class PulseAppServiceRegistration
{
    public static IServiceCollection AddAppService(this IServiceCollection services, Action<PulseAppServiceOptions> optionsBuilder)
    {
        var options = new PulseAppServiceOptions();
        optionsBuilder(options);

        services
            .AddGraphQlServices()
            .AddDapper(options.ConnectionString)
            .AddScoped<PulseAppService>();

        // Register feature services
        services
            .AddSingleton<PostsRepository>()
            .AddSingleton<UsersRepository>()
            .AddSingleton<Auth0ClientService>();

        return services;
    }
}

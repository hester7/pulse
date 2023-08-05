using Pulse.Api.Application.Features.Posts;
using Pulse.Api.Application.Features.Posts.Jobs;
using Pulse.Api.Application.Features.Users;
using Pulse.Api.Dapper;
using Pulse.Api.GraphQl;
using Quartz;

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
            .AddScoped<PulseAppService>()
            .AddQuartz();

        // Register feature services
        services
            .AddSingleton<PostsRepository>()
            .AddSingleton<UsersRepository>()
            .AddSingleton<Auth0ClientService>();

        return services;
    }

    private static IServiceCollection AddQuartz(this IServiceCollection services) =>
        services
            .AddQuartz(configure =>
            {
                // TODO: review this configuration
                configure
                    .AddJob<GenerateCommentJob>(GenerateCommentJob.JobKey,
                        c =>
                        {
                            c.WithIdentity(GenerateCommentJob.JobKey);
                            c.StoreDurably();
                            //c.DisallowConcurrentExecution();
                        })
                    .AddJob<GenerateLikeJob>(GenerateLikeJob.JobKey,
                        c =>
                        {
                            c.WithIdentity(GenerateLikeJob.JobKey);
                            c.StoreDurably();
                            //c.DisallowConcurrentExecution();
                        });
            })
            .AddQuartzHostedService(options => { options.WaitForJobsToComplete = true; });
}

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Pulse.Api.Application.Security;

namespace Pulse.Api.Security;

internal static class SecurityRegistration
{
    public static IServiceCollection AddSecurity(this IServiceCollection services, IConfiguration configuration, Auth0Options auth0Options) =>
        services
            .AddCorsPolicy()
            .AddBearerAuthentication(auth0Options)
            .AddAuthorization(options =>
            {
                options.AddPolicy(Roles.Admin.ToString(), p => p.AddRequirements(new AdminRequirement()));
                options.AddPolicy(Policies.HasRequiredClaims,
                    p =>
                    {
                        p.RequireClaim(Claims.UserId);
                        p.RequireClaim(Claims.UserName);
                        p.RequireClaim(Claims.Email);
                        p.RequireClaim(Claims.Roles);
                    });
            })
            .AddScoped<IAuthorizationHandler, AdminAuthHandler>()
            .AddScoped<CurrentUserHttpService>()
            .Configure<HasuraOptions>(configuration.GetSection("Hasura"));

    public static IApplicationBuilder UseSecurity(this IApplicationBuilder app) =>
        app.UseCors()
            .UseAuthentication()
            .UseAuthorization();

    private static IServiceCollection AddCorsPolicy(this IServiceCollection services) => services
        .AddCors(options =>
        {
            options.AddDefaultPolicy(
                policy =>
                {
                    policy
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
        });

    private static IServiceCollection AddBearerAuthentication(this IServiceCollection services, Auth0Options auth0Options) =>
        services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Authority = auth0Options.Authority;
                options.Audience = auth0Options.Audience;
            })
            .Services;
}

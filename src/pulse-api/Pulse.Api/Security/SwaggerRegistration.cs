using Microsoft.AspNetCore.Http.Json;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using NodaTime;
using NodaTime.Serialization.JsonNet;
using NodaTime.Serialization.SystemTextJson;

namespace Pulse.Api.Security;

public static class SwaggerExtensions
{
    public static IServiceCollection AddSwagger(this IServiceCollection services, Auth0Options auth0Options) =>
        services.AddEndpointsApiExplorer()
            .AddSwaggerGen(c =>
            {
                c.DescribeAllParametersInCamelCase();
                c.ConfigureForNodaTime(new JsonSerializerSettings().ConfigureForNodaTime(DateTimeZoneProviders.Tzdb));

                c.AddSecurityDefinition("oauth2",
                    new OpenApiSecurityScheme
                    {
                        Type = SecuritySchemeType.OAuth2,
                        BearerFormat = "JWT",
                        Flows = new OpenApiOAuthFlows
                        {
                            Implicit = new OpenApiOAuthFlow
                            {
                                TokenUrl = new Uri($"{auth0Options.Authority}oauth/token"),
                                AuthorizationUrl = new Uri($"{auth0Options.Authority}authorize?audience={auth0Options.Audience}"),
                            }
                        }
                    });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "oauth2"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            })
            .Configure<JsonOptions>(o => { o.SerializerOptions.ConfigureForNodaTime(DateTimeZoneProviders.Tzdb); });

    public static void UseSwagger(this IApplicationBuilder app, IWebHostEnvironment webHostEnvironment, Auth0Options auth0Options)
    {
        if (!webHostEnvironment.IsProduction())
        {
            app.UseSwagger();
            app.UseSwaggerUI(settings =>
            {
                settings.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1.0");
                settings.OAuthClientId(auth0Options.WebAppClientId);
                settings.OAuthClientSecret(auth0Options.WebAppClientSecret);
                settings.OAuthUsePkce();
            });
        }
    }
}

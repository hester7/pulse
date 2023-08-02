using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Pulse.Api.Application;
using Pulse.Api.Endpoints;
using Pulse.Api.Security;
using Serilog;
using Serilog.Exceptions;
using Serilog.Sinks.SystemConsole.Themes;

ILogger logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .Enrich.WithExceptionDetails()
    .WriteTo.Console(
        theme: AnsiConsoleTheme.Literate,
        outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj} ({SourceContext}){NewLine}{Exception}"
    )
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .AddJsonFile("appsettings.json")
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", true)
    .AddEnvironmentVariables()
    .Build();

var connectionString = builder.Configuration.GetConnectionString("SqlConnection")!;
var auth0Options = builder.GetAuth0Options();

builder.Services
    .AddAppService(o => { o.UseConnectionString(connectionString); })
    .AddSingleton(logger)
    .AddHttpContextAccessor()
    .AddSwagger(auth0Options)
    .AddSecurity(builder.Configuration, auth0Options)
    .AddRateLimiting()
    .AddHealthChecks()
    .AddNpgSql(connectionString);

var app = builder.Build();

app.UseWebSockets();
app.MapGraphQL();

app.UseSwagger(app.Environment, auth0Options);
app.UseSecurity();
app.UseRateLimiter();

app.MapEndpoints();

app.MapHealthChecks(
    "/health",
    new HealthCheckOptions
    {
        ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
    });

app.Run();

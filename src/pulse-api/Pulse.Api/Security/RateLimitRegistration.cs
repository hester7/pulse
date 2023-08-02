using System.Security.Claims;
using System.Threading.RateLimiting;

namespace Pulse.Api.Security;

internal static class RateLimitRegistration
{
    private const string policy = "PerUserRatelimit";

    public static IServiceCollection AddRateLimiting(this IServiceCollection services) =>
        services.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

            options.AddPolicy(policy,
                context =>
                {
                    var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier)!;

                    return RateLimitPartition.GetTokenBucketLimiter(userId,
                        _ => new TokenBucketRateLimiterOptions
                        {
                            ReplenishmentPeriod = TimeSpan.FromSeconds(10),
                            AutoReplenishment = true,
                            TokenLimit = 10,
                            TokensPerPeriod = 10,
                            QueueLimit = 5,
                        });
                });
        });

    public static IEndpointConventionBuilder RequirePerUserRateLimit(this IEndpointConventionBuilder builder) => builder.RequireRateLimiting(policy);
}
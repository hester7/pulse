using HotChocolate.Execution.Configuration;
using HotChocolate.Subscriptions;
using HotChocolate.Types.NodaTime;

namespace Pulse.Api.GraphQl;

internal static class GraphQlRegistration
{
    public static IServiceCollection AddGraphQlServices(this IServiceCollection services) =>
        services
            .AddHostedService<NotificationListenerService>()
            .AddGraphQlServer()
            .Services;

    private static IRequestExecutorBuilder AddGraphQlServer(this IServiceCollection services) =>
        services
            .AddGraphQLServer()
            .AddApiTypes()
            .AddQueryType()
            .AddSubscriptionType()
            .AddInMemorySubscriptions()
            .RegisterService<ITopicEventSender>()
            .RegisterService<ITopicEventReceiver>()
            .AddType<InstantType>();
}

using Pulse.Api.Domain.Models;

namespace Pulse.Api.GraphQl;

[ExtendObjectType(OperationTypeNames.Subscription)]
internal sealed class Subscription
{
    [Subscribe]
    [Topic(nameof(Post))]
    public Post Post([EventMessage] Post post) => post;
}
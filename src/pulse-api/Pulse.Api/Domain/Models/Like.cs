using NodaTime;

namespace Pulse.Api.Domain.Models;

public record Like
{
    public Guid LikeId { get; init; }
    public Guid PostId { get; init; }
    public string UserId { get; init; } = null!;
    public Instant CreatedAt { get; init; }
}
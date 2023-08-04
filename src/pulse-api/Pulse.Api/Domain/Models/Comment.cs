using NodaTime;

namespace Pulse.Api.Domain.Models;

public record Comment
{
    public Guid CommentId { get; init; }
    public string CommentText { get; init; } = null!;
    public Guid PostId { get; init; }
    public string UserId { get; init; } = null!;
    public Instant CreatedAt { get; init; }
    public Instant UpdatedAt { get; init; }
}
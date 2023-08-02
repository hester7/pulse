using NodaTime;

namespace Pulse.Api.Domain.Models;

public record Post
{
    public Guid PostId { get; set; }
    public string PostText { get; set; } = null!;
    public string UserId { get; set; } = null!;
    public Instant CreatedAt { get; set; }
    public Instant UpdatedAt { get; set; }
}
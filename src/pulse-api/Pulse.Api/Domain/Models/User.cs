using NodaTime;

namespace Pulse.Api.Domain.Models;

public record User
{
    public string UserId { get; init; } = null!;
    public string UserName { get; init; } = null!;
    public string Email { get; init; } = null!;
    public string? Name { get; init; }
    public string? Picture { get; init; }
    public Instant CreatedAt { get; init; }
    public Instant UpdatedAt { get; init; }
    public Instant LastLoginAt { get; init; }
}
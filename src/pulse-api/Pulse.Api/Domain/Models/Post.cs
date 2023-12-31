﻿using NodaTime;

namespace Pulse.Api.Domain.Models;

public record Post
{
    public Guid PostId { get; init; }
    public string PostText { get; init; } = null!;
    public string UserId { get; init; } = null!;
    public Instant CreatedAt { get; init; }
    public Instant UpdatedAt { get; init; }
}
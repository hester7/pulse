using Pulse.Api.Domain.Models;

namespace Pulse.Api.Application.Features.Posts.Models;

public sealed record GenerateLikesResponse(IEnumerable<Like> Likes);
using Pulse.Api.Domain.Models;

namespace Pulse.Api.Application.Features.Posts.Models;

public sealed record GeneratePostsResponse(IEnumerable<Post> Posts);
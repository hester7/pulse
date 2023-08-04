namespace Pulse.Api.Application.Features.Posts.Models;

public sealed record GenerateCommentsRequest(Guid PostId, string PostText);
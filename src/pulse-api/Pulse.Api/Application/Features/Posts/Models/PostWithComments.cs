using Pulse.Api.Domain.Models;

namespace Pulse.Api.Application.Features.Posts.Models;

public sealed record PostWithComments : Post
{
    public string UserName { get; set; } = null!;
    public IEnumerable<string> Comments { get; set; } = Enumerable.Empty<string>();
}
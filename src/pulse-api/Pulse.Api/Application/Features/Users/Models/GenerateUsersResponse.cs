using Pulse.Api.Domain.Models;

namespace Pulse.Api.Application.Features.Users.Models;

public sealed record GenerateUsersResponse(IEnumerable<User> Users);
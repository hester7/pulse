using System.Text.Json.Serialization;

namespace Pulse.Api.Application.Features.Users.Models;

public sealed record GenerateUsersRequest(int Count = 1)
{
    [JsonIgnore]
    public string Identifier { get; init; } = Guid.NewGuid().ToString("N");
}
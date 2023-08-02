namespace Pulse.Api.Application.Features.Users.Models;

public sealed record LoginRequest(string Email, string Password);
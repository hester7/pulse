using Pulse.Api.Application.Features.Users.Commands;
using Pulse.Api.Application.Features.Users.Models;
using Pulse.Api.Dapper;
using Pulse.Api.Domain.Models;

namespace Pulse.Api.Application.Features.Users;

public sealed class UsersRepository
{
    private readonly Auth0ClientService _auth0Client;
    private readonly DapperExecutor _executor;

    public UsersRepository(Auth0ClientService auth0Client, DapperExecutor executor)
    {
        _auth0Client = auth0Client;
        _executor = executor;
    }

    public async Task<LoginResponse> Login(LoginRequest request) => await _auth0Client.Login(request);

    public async Task<GenerateUsersResponse> GenerateAsync(GenerateUsersRequest request, CancellationToken cancellationToken)
    {
        var rowsAffected = await _executor.ExecuteAsync(new SaveUsersCommand(request), cancellationToken);
        if (rowsAffected == 0)
            return new GenerateUsersResponse(Enumerable.Empty<User>());

        var users = await _executor.QueryAsync<User>(new GetUsersCommand(request), cancellationToken);
        return new GenerateUsersResponse(users);
    }
}
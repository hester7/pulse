using Auth0.AuthenticationApi;
using Auth0.AuthenticationApi.Models;
using Microsoft.Extensions.Options;
using Pulse.Api.Application.Features.Users.Models;
using Pulse.Api.Security;

namespace Pulse.Api.Application.Features.Users;

public sealed class Auth0ClientService
{
    private readonly Auth0Options _auth0Options;
    private readonly AuthenticationApiClient _authenticationApiClient;

    public Auth0ClientService(IOptions<Auth0Options> auth0Options)
    {
        _auth0Options = auth0Options.Value;
        _authenticationApiClient = new AuthenticationApiClient(_auth0Options.Domain);
    }

    public async Task<LoginResponse> Login(LoginRequest request)
    {
        // TODO: this doesn't quite work. It returns an invalid token
        var tokenRequest = new ResourceOwnerTokenRequest
        {
            ClientId = _auth0Options.M2mClientId,
            ClientSecret = _auth0Options.M2mClientSecret,
            Realm = _auth0Options.Database,
            Username = request.Email,
            Password = request.Password,
        };

        var tokenResponse = await _authenticationApiClient.GetTokenAsync(tokenRequest);
        return new LoginResponse(tokenResponse.AccessToken);
    }
}
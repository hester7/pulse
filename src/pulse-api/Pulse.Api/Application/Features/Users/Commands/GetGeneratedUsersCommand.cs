using Pulse.Api.Application.Features.Users.Models;
using Pulse.Api.Dapper.Commands;

namespace Pulse.Api.Application.Features.Users.Commands;

internal sealed class GetGeneratedUsersCommand : DapperTextCommand
{
    public GetGeneratedUsersCommand(GenerateUsersRequest request)
    {
        Parameters = new
        {
            request.Identifier,
        };
    }

    public override string Text => @"
        SELECT u.*
        FROM users u
        WHERE u.user_id LIKE CONCAT(@identifier, '|%');
        ";
}
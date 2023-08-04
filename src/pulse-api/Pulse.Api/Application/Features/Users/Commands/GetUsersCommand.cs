using Pulse.Api.Dapper.Commands;

namespace Pulse.Api.Application.Features.Users.Commands;

internal sealed class GetUsersCommand : DapperTextCommand
{
    public override string Text => @"
        SELECT u.*
        FROM users u;
        ";
}
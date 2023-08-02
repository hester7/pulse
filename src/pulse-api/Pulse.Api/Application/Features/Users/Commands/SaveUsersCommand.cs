using System.Text;
using Bogus;
using Pulse.Api.Application.Features.Users.Models;
using Pulse.Api.Dapper.Commands;
using Pulse.Api.Domain.Models;

namespace Pulse.Api.Application.Features.Users.Commands;

internal sealed class SaveUsersCommand : DapperTextCommand
{
    private readonly User[] _users;

    public SaveUsersCommand(GenerateUsersRequest request)
    {
        if (request.Count == 0)
        {
            _users = Array.Empty<User>();
            return;
        }

        _users = new User[request.Count];
        for (var i = 0; i < request.Count; i++)
        {
            var person = new Person();
            _users[i] = new User
            {
                UserId = $"{request.Identifier}|{i + 1}",
                UserName = person.UserName,
                Email = person.Email,
                Name = person.FullName,
                Picture = person.Avatar
            };
        }

        Parameters = new
        {
            Users = _users
        };
    }

    public override string Text
    {
        get
        {
            if (_users.Length == 0)
                return "SELECT 0";

            var sb = new StringBuilder();
            sb.Append(@"
                INSERT INTO users (user_id, user_name, email, name, picture)
                VALUES");

            for (var i = 0; i < _users.Length; i++)
            {
                var user = _users[i];
                sb.Append(@$"
                {(i == 0 ? string.Empty : ", ")}('{user.UserId}', '{user.UserName}', '{user.Email}', '{user.Name}', '{user.Picture}')");
            }

            sb.Append(@"
                ON CONFLICT DO NOTHING;");

            return sb.ToString();
        }
    }
}
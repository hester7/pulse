using System.Text;
using Bogus;
using Dapper;
using Pulse.Api.Application.Features.Users.Models;
using Pulse.Api.Dapper.Commands;
using Pulse.Api.Domain.Models;

namespace Pulse.Api.Application.Features.Users.Commands;

internal sealed class InsertUsersCommand : DapperTextCommand
{
    private readonly User[] _users;

    public InsertUsersCommand(GenerateUsersRequest request)
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

        Parameters = GetParameters();
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
                sb.Append(@$"
                {(i == 0 ? string.Empty : ", ")}(@UserId{i}, @UserName{i}, @Email{i}, @Name{i}, @Picture{i})");
            }

            sb.Append(@"
                ON CONFLICT DO NOTHING;");

            return sb.ToString();
        }
    }

    private DynamicParameters GetParameters()
    {
        var parameters = new DynamicParameters();

        for (var i = 0; i < _users.Length; i++)
        {
            var user = _users[i];
            parameters.Add($"UserId{i}", user.UserId);
            parameters.Add($"UserName{i}", user.UserName);
            parameters.Add($"Email{i}", user.Email);
            parameters.Add($"Name{i}", user.Name);
            parameters.Add($"Picture{i}", user.Picture);
        }

        return parameters;
    }
}
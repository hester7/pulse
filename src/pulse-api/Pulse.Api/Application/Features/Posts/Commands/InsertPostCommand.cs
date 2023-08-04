using Pulse.Api.Dapper.Commands;
using Pulse.Api.Domain.Models;

namespace Pulse.Api.Application.Features.Posts.Commands;

internal sealed class InsertPostCommand : DapperTextCommand
{
    public InsertPostCommand(Post post)
    {
        Parameters = new
        {
            post.PostText,
            post.UserId
        };
    }

    public override string Text => @"
        INSERT INTO posts (post_text, user_id)
        VALUES (@PostText, @UserId);
        ";
}
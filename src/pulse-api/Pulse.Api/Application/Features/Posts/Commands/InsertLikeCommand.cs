using Pulse.Api.Dapper.Commands;
using Pulse.Api.Domain.Models;

namespace Pulse.Api.Application.Features.Posts.Commands;

internal sealed class InsertLikeCommand : DapperTextCommand
{
    public InsertLikeCommand(Like like)
    {
        Parameters = new
        {
            like.PostId,
            like.UserId,
        };
    }

    public override string Text => @"
        INSERT INTO likes (post_id, user_id)
        VALUES (@PostId, @UserId);
        ";
}
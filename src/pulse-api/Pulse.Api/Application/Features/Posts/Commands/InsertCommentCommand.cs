using Pulse.Api.Dapper.Commands;
using Pulse.Api.Domain.Models;

namespace Pulse.Api.Application.Features.Posts.Commands;

internal sealed class InsertCommentCommand : DapperTextCommand
{
    public InsertCommentCommand(Comment comment)
    {
        Parameters = new
        {
            comment.CommentText,
            comment.PostId,
            comment.UserId
        };
    }

    public override string Text => @"
        INSERT INTO comments (comment_text, post_id, user_id)
        VALUES (@CommentText, @PostId, @UserId);
        ";
}
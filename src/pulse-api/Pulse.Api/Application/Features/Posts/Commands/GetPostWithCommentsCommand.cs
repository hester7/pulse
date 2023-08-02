using Pulse.Api.Application.Features.Posts.Models;
using Pulse.Api.Dapper.Commands;

namespace Pulse.Api.Application.Features.Posts.Commands;

internal sealed class GetPostWithCommentsCommand : DapperTextCommand
{
    public GetPostWithCommentsCommand(PostWithCommentsRequest request)
    {
        Parameters = new
        {
            request.PostId,
        };
    }

    public override string Text => @"
        SELECT p.*,
               u.user_name,
               ARRAY_AGG(c.comment_text) AS comments
        FROM posts p
        INNER JOIN users u ON p.user_id = u.user_id
        LEFT JOIN comments c ON p.post_id = c.post_id
        WHERE p.post_id = @postId
        GROUP BY p.post_id, u.user_name;
        ";
}
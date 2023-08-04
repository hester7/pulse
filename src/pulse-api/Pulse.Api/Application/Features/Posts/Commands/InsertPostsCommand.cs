using System.Text;
using Dapper;
using Pulse.Api.Dapper.Commands;
using Pulse.Api.Domain.Models;

namespace Pulse.Api.Application.Features.Posts.Commands;

internal sealed class InsertPostsCommand : DapperTextCommand
{
    private readonly Post[] _posts;
    private readonly Comment[] _comments;
    private readonly Like[] _likes;

    public InsertPostsCommand(Post[] posts, Comment[] comments, Like[] likes)
    {
        _posts = posts;
        _comments = comments;
        _likes = likes;

        Parameters = GetParameters();
    }

    public override string Text
    {
        get
        {
            if (_posts.Length == 0)
                return "SELECT 0";

            var sb = new StringBuilder();
            sb.Append(@"
                INSERT INTO posts (post_id, post_text, user_id)
                VALUES");

            for (var i = 0; i < _posts.Length; i++)
            {
                sb.Append(@$"
                {(i == 0 ? string.Empty : ", ")}(@PostId{i}, @PostText{i}, @UserId{i})");
            }

            sb.Append(";");

            if (_comments.Length > 0)
            {
                sb.Append(@"
                INSERT INTO comments (comment_text, post_id, user_id)
                VALUES");

                for (var i = 0; i < _comments.Length; i++)
                {
                    sb.Append(@$"
                    {(i == 0 ? string.Empty : ", ")}(@CommentText{i}, @CommentPostId{i}, @CommentUserId{i})");
                }

                sb.Append(";");
            }

            if (_likes.Length > 0)
            {
                sb.Append(@"
                INSERT INTO likes (post_id, user_id)
                VALUES");

                for (var i = 0; i < _likes.Length; i++)
                {
                    sb.Append(@$"
                    {(i == 0 ? string.Empty : ", ")}(@LikePostId{i}, @LikeUserId{i})");
                }

                sb.Append(";");
            }

            return sb.ToString();
        }
    }

    private DynamicParameters GetParameters()
    {
        var parameters = new DynamicParameters();

        for (var i = 0; i < _posts.Length; i++)
        {
            var post = _posts[i];
            parameters.Add($"PostId{i}", post.PostId);
            parameters.Add($"PostText{i}", post.PostText);
            parameters.Add($"UserId{i}", post.UserId);
        }

        for (var i = 0; i < _comments.Length; i++)
        {
            var comment = _comments[i];
            parameters.Add($"CommentText{i}", comment.CommentText);
            parameters.Add($"CommentPostId{i}", comment.PostId);
            parameters.Add($"CommentUserId{i}", comment.UserId);
        }

        for (var i = 0; i < _likes.Length; i++)
        {
            var like = _likes[i];
            parameters.Add($"LikePostId{i}", like.PostId);
            parameters.Add($"LikeUserId{i}", like.UserId);
        }

        return parameters;
    }
}
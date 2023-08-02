import { gql } from "@apollo/client";

export default gql`
    mutation InsertComment($comment_text: String!, $user_id: String!, $post_id: uuid!) {
        insert_comments_one(object: { comment_text: $comment_text, post_id: $post_id, user_id: $user_id }) {
            comment_id
            comment_text
            created_at
            user {
                name
                user_name
                picture
            }
        }
    }
`;

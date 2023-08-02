import { gql } from "@apollo/client";

export default gql`
    mutation DeleteComment($comment_id: uuid!) {
        delete_comments_by_pk(comment_id: $comment_id) {
            comment_id
        }
    }
`;

import { gql } from "@apollo/client";

export default gql`
    mutation UpdateComment($comment_id: uuid!, $comment_text: String!) {
        update_comments_by_pk(pk_columns: { comment_id: $comment_id }, _set: { comment_text: $comment_text }) {
            comment_id
            comment_text
        }
    }
`;

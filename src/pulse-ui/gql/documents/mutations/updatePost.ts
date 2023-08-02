import { gql } from "@apollo/client";

export default gql`
    mutation UpdatePost($post_id: uuid!, $post_text: String!) {
        update_posts_by_pk(pk_columns: { post_id: $post_id }, _set: { post_text: $post_text }) {
            post_id
        }
    }
`;

import { gql } from "@apollo/client";

export default gql`
    mutation DeletePost($post_id: uuid!) {
        delete_posts_by_pk(post_id: $post_id) {
            post_id
        }
    }
`;

import { gql } from "@apollo/client";

export default gql`
    mutation InsertPost($post_text: String!, $user_id: String!) {
        insert_posts_one(object: { post_text: $post_text, user_id: $user_id }) {
            post_id
        }
    }
`;

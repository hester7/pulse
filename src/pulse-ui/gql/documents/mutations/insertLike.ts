import { gql } from "@apollo/client";

export default gql`
    mutation InsertLike($post_id: uuid!, $user_id: String!) {
        insert_likes_one(object: { post_id: $post_id, user_id: $user_id }) {
            like_id
            user {
                user_name
            }
        }
    }
`;

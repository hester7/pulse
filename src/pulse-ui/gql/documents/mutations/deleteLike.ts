import { gql } from "@apollo/client";

export default gql`
    mutation DeleteLike($like_id: uuid!) {
        delete_likes_by_pk(like_id: $like_id) {
            like_id
        }
    }
`;

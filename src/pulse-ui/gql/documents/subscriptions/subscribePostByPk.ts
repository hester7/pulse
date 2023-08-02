import { gql } from "@apollo/client";

export default gql`
    subscription SubscribePostByPk($post_id: uuid!) {
        posts_by_pk(post_id: $post_id) {
            post_id
            post_text
            created_at
            user {
                name
                user_name
                picture
            }
            comments(order_by: { created_at: desc }) {
                comment_id
                comment_text
                created_at
                user {
                    name
                    user_name
                    picture
                }
            }
            likes {
                like_id
                user {
                    user_name
                }
            }
        }
    }
`;

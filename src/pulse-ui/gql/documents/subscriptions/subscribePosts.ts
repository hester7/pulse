import { gql } from "@apollo/client";

// TODO: pagination
export default gql`
    subscription SubscribePosts($user_name: String_comparison_exp) {
        posts(order_by: { created_at: desc }, where: { user: { user_name: $user_name } }, limit: 100) {
            post_id
            post_text
            created_at
            user {
                name
                user_name
                picture
            }
            comments {
                comment_id
                user {
                    user_name
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

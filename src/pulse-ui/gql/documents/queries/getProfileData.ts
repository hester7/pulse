import { gql } from "@apollo/client";

export default gql`
    query GetProfileData($user_name: String!) {
        posts(order_by: { created_at: desc }, where: { user: { user_name: { _eq: $user_name } } }) {
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
        comments(where: { user: { user_name: { _eq: $user_name } } }, order_by: { post: { created_at: desc } }) {
            post {
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
        likes(where: { user: { user_name: { _eq: $user_name } } }, order_by: { post: { created_at: desc } }) {
            post {
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
    }
`;

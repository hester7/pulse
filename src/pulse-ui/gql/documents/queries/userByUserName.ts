import { gql } from "@apollo/client";

export default gql`
    query UserByUserName($user_name: String!) {
        users(limit: 1, where: { user_name: { _eq: $user_name } }) {
            user_name
            name
            picture
            created_at
        }
    }
`;

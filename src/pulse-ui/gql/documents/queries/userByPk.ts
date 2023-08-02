import { gql } from "@apollo/client";

export default gql`
    query UserByPk($user_id: String!) {
        users_by_pk(user_id: $user_id) {
            user_name
            email
            name
            picture
            created_at
        }
    }
`;

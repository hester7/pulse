import { gql } from "@apollo/client";

export default gql`
    mutation UpsertUser(
        $user_id: String!
        $user_name: String!
        $email: String!
        $name: String
        $picture: String
        $update_columns: [users_update_column!]
        $last_login_at: timestamptz!
    ) {
        insert_users_one(
            object: { user_id: $user_id, user_name: $user_name, email: $email, name: $name, picture: $picture, last_login_at: $last_login_at }
            on_conflict: { constraint: users_pkey, update_columns: $update_columns }
        ) {
            user_id
            user_name
            name
            email
            picture
            created_at
            updated_at
            last_login_at
        }
    }
`;

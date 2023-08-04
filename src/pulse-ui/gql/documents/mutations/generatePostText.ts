import { gql } from "@apollo/client";

export default gql`
    mutation GeneratePostText($category: String!) {
        generatePostText(args: { category: $category }) {
            postText
        }
    }
`;

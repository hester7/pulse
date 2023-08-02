import { getApolloClient } from "@/gql/apolloRscClient";
import { GetPostsDocument, GetPostsQuery, GetPostsQueryVariables } from "@/gql/graphql";
import { getSession } from "@auth0/nextjs-auth0";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Post from "../components/Post";

// Use Segment Options to specify the caching options for a particular page
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
//export const revalidate = 30;

export default async function Page() {
    const session = await getSession();
    if (!session) {
        return <Alert severity="error">Oops... You must sign in to view this page</Alert>;
    }

    const apolloClient = getApolloClient();
    const { data } = await apolloClient.query<GetPostsQuery, GetPostsQueryVariables>({
        query: GetPostsDocument,
        variables: {
            user_name: {},
        },
    });

    return (
        <Container>
            <Box sx={{ my: 2 }}>
                <Stack spacing={4}>
                    {data.posts.map((post) => (
                        <Post key={post.post_id} post={post} />
                    ))}
                </Stack>
            </Box>
        </Container>
    );
}

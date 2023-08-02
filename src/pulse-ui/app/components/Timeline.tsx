"use client";

import { useSubscribePostsSubscription } from "@/gql/graphql";
import Post from "./Post";
import { Stack, Typography } from "@mui/material";
import { PostSkeleton } from "./PostSkeleton";

type TimelineProps = {
    userName?: string | undefined;
};

export const Timeline = ({ userName }: TimelineProps) => {
    const { data, loading, error } = useSubscribePostsSubscription({
        variables: {
            user_name: userName !== undefined ? { _eq: userName } : {},
        },
    });

    if (loading) {
        return (
            <Stack spacing={4}>
                {[...new Array(20)].map((_, index) => (
                    <PostSkeleton key={index} />
                ))}
            </Stack>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return (
            <Stack alignItems="center">
                <Typography variant="h6">No data available</Typography>
            </Stack>
        );
    }

    return (
        <Stack spacing={4}>
            {data.posts.map((post) => (
                <Post key={post.post_id} post={post} addNavigation={true} />
            ))}
        </Stack>
    );
};

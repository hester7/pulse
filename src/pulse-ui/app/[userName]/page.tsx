"use client";

import { Container, Typography, Box, Stack, Skeleton } from "@mui/material";
import Image from "next/image";
import { Timeline } from "../components/Timeline";
import { PostSkeleton } from "../components/PostSkeleton";
import { DateTime } from "luxon";
import CircleImageWrapper from "../components/CircleImageWrapper";
import { useUserByUserNameQuery } from "@/gql/graphql";
import { notFound } from "next/navigation";

type UserProps = {
    params: { userName: string };
};

const formatJoinedDate = (createdAt: string) => {
    const joinedDate = DateTime.fromISO(createdAt);
    return `Joined ${joinedDate.toFormat("MMMM yyyy")}`;
};

export default function User(props: UserProps) {
    const { data, loading, error, called } = useUserByUserNameQuery({
        variables: {
            user_name: props.params.userName,
        },
    });

    if (loading || !called) {
        return (
            <Container className="pt-2">
                <Stack spacing={2} sx={{ marginBottom: "2rem" }}>
                    <Stack direction="row">
                        <Skeleton variant="circular" width={140} height={140} />
                    </Stack>
                    <Skeleton variant="text" width="200px" height={40} />
                    <Skeleton variant="text" width="150px" height={30} />
                    <Stack direction="row" spacing={1}>
                        <Skeleton variant="text" width={100} height={20} />
                    </Stack>
                </Stack>
                <Box sx={{ my: 2 }}>
                    <Stack spacing={4}>
                        {[...new Array(20)].map((_, index) => (
                            <PostSkeleton key={index} />
                        ))}
                    </Stack>
                </Box>
            </Container>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const user = data?.users[0];

    if (!user) {
        return notFound();
    }

    return (
        <>
            <Container className="pt-2">
                <Stack spacing={2} sx={{ marginBottom: "2rem" }}>
                    <Stack direction="row" style={{ width: "100%" }}>
                        {user.picture && (
                            <CircleImageWrapper size={140}>
                                <Image priority style={{ borderRadius: "50%" }} src={user.picture} alt="Avatar" width={140} height={140} />
                            </CircleImageWrapper>
                        )}
                    </Stack>

                    <Typography sx={{ fontWeight: 600, fontSize: "2rem", lineHeight: 1.2 }}>{user.name}</Typography>
                    <Typography sx={{ fontSize: "1.25rem", color: "#6c757d" }}>@{user.user_name}</Typography>
                    <Typography variant="caption">{formatJoinedDate(user.created_at)}</Typography>
                </Stack>
                <Box sx={{ my: 2 }}>
                    <Timeline userName={user.user_name} />
                </Box>
            </Container>
        </>
    );
}

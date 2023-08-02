"use client";

import { Alert, Avatar, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useSubscribePostByPkSubscription, useInsertCommentMutation } from "@/gql/graphql";
import { notFound } from "next/navigation";
import { PostSkeleton } from "@/app/components/PostSkeleton";
import Post from "@/app/components/Post";
import { Comment } from "@/app/components/Comment";
import { useCurrentUser } from "@/app/providers/CurrentUserProvider";
import { ChangeEvent, useState } from "react";

const MAX_CHARACTERS = 480;

type BeatProps = {
    params: { beatId: string };
};

export default function Beat(props: BeatProps) {
    const { user } = useCurrentUser();
    const [comment, setComment] = useState<string>("");
    const [alert, setAlert] = useState<string | null>(null);
    const { data, loading, error } = useSubscribePostByPkSubscription({
        variables: {
            post_id: props.params.beatId,
        },
    });
    const [insertComment] = useInsertCommentMutation();

    if (loading) {
        return (
            <Container className="pt-2">
                <Stack spacing={2} sx={{ marginBottom: "2rem" }}>
                    <PostSkeleton />
                </Stack>
            </Container>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const post = data?.posts_by_pk;

    if (!post) {
        return notFound();
    }

    const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAlert(null);
        setComment(e.target.value);
    };

    const handleCreateComment = () => {
        if (!comment) return;

        insertComment({
            variables: {
                comment_text: comment,
                post_id: post.post_id,
                user_id: user!.userId,
            },
            onCompleted: () => {
                setComment("");
                setAlert(null);
            },
            onError: (error) => {
                setAlert(error.message);
            },
        });
    };

    return (
        <Container className="pt-2">
            <Stack spacing={4} sx={{ marginBottom: "2rem" }}>
                <Post post={post} redirectOnDelete={true} />
                {user ? (
                    <Stack direction="row" spacing={2}>
                        <Avatar alt="User" src={user!.picture} imgProps={{ referrerPolicy: "no-referrer" }} className="mt-4" />
                        <Stack style={{ width: "100%" }}>
                            <TextField
                                label={comment ? null : "Add your comment..."}
                                value={comment}
                                onChange={handleCommentChange}
                                multiline
                                rows="3"
                                fullWidth
                                style={{ marginTop: 12 }}
                                color="info"
                                InputLabelProps={{
                                    shrink: false,
                                }}
                                inputProps={{
                                    maxLength: MAX_CHARACTERS,
                                }}
                            />
                            <Stack direction="row">
                                <Typography variant="caption" color="textSecondary">
                                    {comment ? `${comment.length} of ${MAX_CHARACTERS} characters` : ""}
                                </Typography>
                                <div className="flex-grow"></div>
                                <Button onClick={handleCreateComment} color="primary" variant="contained" sx={{ marginTop: 4, borderRadius: 3 }}>
                                    Comment
                                </Button>
                                {alert && <Alert severity="error">{alert}</Alert>}
                            </Stack>
                        </Stack>
                    </Stack>
                ) : null}
                <Stack spacing={4}>
                    {post.comments.map((comment) => (
                        <Comment key={comment.comment_id} comment={comment} />
                    ))}
                </Stack>
            </Stack>
        </Container>
    );
}

"use client";

import { Comment as CommentQuery } from "@/types/Comment";
import { Typography, Card, CardHeader, CardContent, Stack, TextField, Alert, Snackbar, useMediaQuery, Theme } from "@mui/material";
import { ChangeEvent, SyntheticEvent, useMemo, useState } from "react";
import { GetPostByPkQuery, useDeleteCommentMutation, useUpdateCommentMutation } from "@/gql/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { useCurrentUser } from "../providers/CurrentUserProvider";
import CardHeaderTitle from "./CardHeaderTitle";
import { formatDate, formatDateTooltip } from "@/utils/date";
import CardHeaderAvatar from "./CardHeaderAvatar";

const MAX_CHARACTERS = 480;

type CommentProps = {
    comment: CommentQuery;
    refetch?: () => Promise<ApolloQueryResult<GetPostByPkQuery>> | undefined;
};

export const Comment = ({ comment, refetch = undefined }: CommentProps) => {
    const name = comment.user?.name || "";
    const userName = comment.user?.user_name || "";
    const date = comment.created_at;
    const picture = comment.user?.picture || "";
    const [text, setText] = useState<string>(comment.comment_text);
    const [isEditing, setIsEditing] = useState(false);
    const [editingText, setEditingText] = useState<string>(comment.comment_text);
    const [alert, setAlert] = useState<string | null>(null);
    const { user } = useCurrentUser();
    const [deleteComment] = useDeleteCommentMutation();
    const [updateComment] = useUpdateCommentMutation();
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    const formattedDate = useMemo(() => formatDate(date), [date]);
    const formattedDateTooltip = useMemo(() => formatDateTooltip(date), [date]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleDelete = () => {
        deleteComment({
            variables: {
                comment_id: comment.comment_id,
            },
            onCompleted: () => {
                refetch && refetch();
            },
            onError: (error) => {
                setAlert(error.message);
            },
        });
    };

    const handleSave = async () => {
        if (!editingText) {
            return false;
        }

        const result = await updateComment({
            variables: {
                comment_id: comment.comment_id,
                comment_text: editingText,
            },
            onCompleted: () => {
                refetch && refetch();
                setText(editingText);
                setIsEditing(false);
            },
            onError: (error) => {
                setAlert(error.message);
            },
        });

        return !result.errors;
    };

    const handleCancel = () => {
        setEditingText(text);
        setIsEditing(false);
    };

    const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditingText(e.target.value);
    };

    const handleAlertClose = (_: SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") return;
        setAlert(null);
    };

    return (
        <Card variant="outlined" className="dark:bg-light-black dark:hover:bg-pale-black">
            <CardHeader
                avatar={<CardHeaderAvatar userName={userName} picture={picture} />}
                title={
                    <CardHeaderTitle
                        userName={userName}
                        name={name}
                        isMobile={isMobile}
                        formattedDate={formattedDate}
                        formattedDateTooltip={formattedDateTooltip}
                        user={user}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                        type="comment"
                    />
                }
            />
            <CardContent style={{ paddingTop: 4 }}>
                {isEditing ? (
                    <Stack>
                        <TextField
                            value={editingText}
                            onChange={handleCommentChange}
                            multiline
                            rows={3}
                            fullWidth
                            autoFocus
                            color="info"
                            InputLabelProps={{
                                shrink: false,
                            }}
                            inputProps={{
                                maxLength: MAX_CHARACTERS,
                            }}
                        />
                        <Typography variant="caption" color="textSecondary">
                            {editingText ? `${editingText.length} of ${MAX_CHARACTERS} characters` : ""}
                        </Typography>
                        <Snackbar open={!!alert} autoHideDuration={6000} onClose={handleAlertClose}>
                            <Alert severity="error" elevation={6} variant="filled">
                                {alert}
                            </Alert>
                        </Snackbar>
                    </Stack>
                ) : (
                    <Typography variant="body1" component="p">
                        {text}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

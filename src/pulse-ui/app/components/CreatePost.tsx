"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Theme, Avatar, IconButton, Box, Tooltip, Typography, Alert } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import FaceIcon from "@mui/icons-material/Face";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CloseIcon from "@mui/icons-material/Close";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import { ChangeEvent, useCallback, useState } from "react";
import { useInsertPostMutation } from "@/gql/graphql";
import { useCurrentUser } from "../providers/CurrentUserProvider";

const MAX_CHARACTERS = 480;

type CreatePostProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

export const CreatePost = ({ open, setOpen }: CreatePostProps) => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const { user } = useCurrentUser();
    const [post, setPost] = useState<string>("");
    const [alert, setAlert] = useState<string | null>(null);
    const [insertPost] = useInsertPostMutation();

    const handleClose = useCallback(() => {
        setPost("");
        setAlert(null);
        setOpen(false);
    }, [setOpen]);

    const handleEscapeKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "Escape") {
                handleClose();
            }
        },
        [handleClose]
    );

    const handlePostChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAlert(null);
        setPost(e.target.value);
    };

    const handleGeneratePost = () => {
        // TODO:
        setPost("Randomly generated post");
    };
    const handleCreatePost = () => {
        setAlert(null);

        if (!post) return;

        insertPost({
            variables: {
                user_id: user!.userId,
                post_text: post,
            },
            onCompleted: () => {
                handleClose();
            },
            onError: (error) => {
                setAlert(error.message);
            },
        });
    };

    return (
        <Dialog open={open} onKeyDown={handleEscapeKeyDown} fullScreen={isMobile}>
            <Box
                sx={{
                    width: isMobile ? "100%" : 600,
                }}
            >
                <DialogTitle>
                    {user?.picture ? (
                        <Avatar alt="User" src={user!.picture} imgProps={{ referrerPolicy: "no-referrer" }} />
                    ) : (
                        <Avatar
                            alt="User"
                            imgProps={{ referrerPolicy: "no-referrer" }}
                            sx={(theme) => ({
                                color: theme.palette.primary.main,
                                backgroundColor: "#fff",
                            })}
                        >
                            <FaceIcon fontSize="large" />
                        </Avatar>
                    )}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label={post ? null : "What is happening?!"}
                        value={post}
                        onChange={handlePostChange}
                        multiline
                        rows={isMobile ? 12 : 7}
                        fullWidth
                        autoFocus
                        style={{ marginTop: 12 }}
                        color="info"
                        InputLabelProps={{
                            shrink: false,
                        }}
                        inputProps={{
                            maxLength: MAX_CHARACTERS,
                        }}
                    />
                    <Typography variant="caption" color="textSecondary">
                        {post ? `${post.length} of ${MAX_CHARACTERS} characters` : ""}
                    </Typography>
                </DialogContent>
                <DialogActions style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}>
                    <Tooltip title="Powered by Chat GPT">
                        <Button onClick={handleGeneratePost} color="secondary" variant="contained" startIcon={<AutoFixHighIcon />} sx={{ borderRadius: 3 }}>
                            Generate
                        </Button>
                    </Tooltip>
                    <div className="flex-grow"></div>
                    <Button onClick={handleCreatePost} color="primary" variant="contained" startIcon={<HeadphonesIcon />} sx={{ borderRadius: 3 }}>
                        Drop A Beat
                    </Button>
                </DialogActions>
                {alert && <Alert severity="error">{alert}</Alert>}
            </Box>
        </Dialog>
    );
};

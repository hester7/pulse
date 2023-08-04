"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Theme,
    Avatar,
    IconButton,
    Box,
    Tooltip,
    Typography,
    Alert,
    CircularProgress,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import FaceIcon from "@mui/icons-material/Face";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CloseIcon from "@mui/icons-material/Close";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import { ChangeEvent, useCallback, useState } from "react";
import { useInsertPostMutation, useGeneratePostTextMutation } from "@/gql/graphql";
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
    const [category, setCategory] = useState<string>("");
    const [generateOpen, setGenerateOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [insertPost] = useInsertPostMutation();
    const [generatePostText] = useGeneratePostTextMutation();

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

    const handleGenerateOpen = () => {
        setCategory("");
        setGenerateOpen(true);
    };

    const handleGeneratePost = () => {
        if (!category) return;

        setGenerateOpen(false);
        setLoading(true);

        generatePostText({
            variables: {
                category,
            },
            onCompleted: (data) => {
                setLoading(false);
                setPost(data.generatePostText?.postText ?? "");
            },
            onError: (error) => {
                setLoading(false);
                setAlert(error.message);
            },
        });
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

    const handleGenerateClose = () => {
        setGenerateOpen(false);
    };

    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    };

    return (
        <>
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
                        <div style={{ position: "relative" }}>
                            {loading && (
                                <CircularProgress
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        marginTop: -20,
                                        marginLeft: -20,
                                    }}
                                />
                            )}
                            <TextField
                                label={post ? null : "What is happening?!"}
                                value={post}
                                onChange={handlePostChange}
                                multiline
                                rows={isMobile ? 7 : 12}
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
                        </div>
                    </DialogContent>
                    <DialogActions style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}>
                        <Tooltip title="Powered by Chat GPT">
                            <Button onClick={handleGenerateOpen} color="secondary" variant="contained" startIcon={<AutoFixHighIcon />} sx={{ borderRadius: 3 }}>
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
            <Dialog open={generateOpen} onClose={handleGenerateClose}>
                <Box
                    sx={{
                        width: 300,
                    }}
                >
                    <DialogTitle>Choose a category</DialogTitle>
                    <DialogContent sx={{ paddingBottom: 0 }}>
                        <TextField
                            label="Category"
                            value={category}
                            onChange={handleCategoryChange}
                            fullWidth
                            autoFocus
                            style={{ marginTop: "8px", marginBottom: "20px" }}
                            color="info"
                            inputProps={{
                                maxLength: 20,
                            }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ paddingLeft: "24px", paddingRight: "24px", paddingBottom: "24px" }}>
                        <Tooltip title="Powered by Chat GPT">
                            <Button onClick={handleGeneratePost} color="secondary" variant="contained" startIcon={<AutoFixHighIcon />} sx={{ borderRadius: 3 }}>
                                Generate
                            </Button>
                        </Tooltip>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
};

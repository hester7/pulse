"use client";

import { Post as PostQuery } from "@/types/Post";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ChangeEvent, SyntheticEvent, memo, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Alert,
    BottomNavigation,
    BottomNavigationAction,
    Card,
    CardContent,
    CardHeader,
    Snackbar,
    Stack,
    TextField,
    Theme,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useDeletePostMutation, useUpdatePostMutation, useDeleteLikeMutation, useInsertLikeMutation } from "@/gql/graphql";
import { Like } from "@/types/Like";
import { useCurrentUser } from "../providers/CurrentUserProvider";
import { ApolloQueryResult } from "@apollo/client";
import CardHeaderTitle from "./CardHeaderTitle";
import { formatDate, formatDateTooltip } from "@/utils/date";
import CardHeaderAvatar from "./CardHeaderAvatar";

const MAX_CHARACTERS = 480;

type BottomNavigationActionIconProps = {
    icon: React.ReactElement;
    count: number;
};

const BottomNavigationActionIcon = ({ icon, count }: BottomNavigationActionIconProps) => {
    return (
        <Stack direction="row" spacing={4}>
            {icon}
            <Typography variant="button">{count}</Typography>
        </Stack>
    );
};

type PostProps = {
    post: PostQuery;
    addNavigation?: boolean;
    refetch?: () => Promise<ApolloQueryResult<any>> | undefined;
    redirectOnDelete?: boolean;
};

const Post = memo<PostProps>(function Post({ post, addNavigation = false, refetch = undefined, redirectOnDelete = false }: PostProps) {
    const { user } = useCurrentUser();
    const name = post.user?.name || "";
    const userName = post.user?.user_name || "";
    const date = post.created_at;
    const picture = post.user?.picture || "";
    const commentsCount = post.comments.length;
    const [userLike, setUserLike] = useState<Like | undefined>();
    const [likesCount, setLikesCount] = useState<number>(0);
    const [anyUserComments, setAnyUserComments] = useState<boolean>();
    const [alert, setAlert] = useState<string | null>(null);
    const [isLikeCountChanging, setIsLikeCountChanging] = useState(false);
    const router = useRouter();
    const [deleteLike] = useDeleteLikeMutation();
    const [insertLike] = useInsertLikeMutation();
    const [text, setText] = useState<string>(post.post_text);
    const [isEditing, setIsEditing] = useState(false);
    const [editingText, setEditingText] = useState<string>(post.post_text);
    const [deletePost] = useDeletePostMutation();
    const [updatePost] = useUpdatePostMutation();
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    useEffect(() => {
        setUserLike(post.likes.find((l) => l.user.user_name === user?.userName));
        setLikesCount(post.likes.length);
        setAnyUserComments(post.comments.some((c) => c.user.user_name === user?.userName));
    }, [post.comments, post.likes, user?.userName]);

    const formattedDate = useMemo(() => formatDate(date), [date]);
    const formattedDateTooltip = useMemo(() => formatDateTooltip(date), [date]);

    const handlePostClick = useMemo(() => {
        return (postId: string) => {
            if (addNavigation) {
                router.push(`/beat/${postId}`);
            }
        };
    }, [addNavigation, router]);

    const handleBottomNavigationClick = useMemo(() => {
        return (_: SyntheticEvent<Element, Event>, value: { postId: number; action: string }) => {
            const { postId, action } = value;
            if (action === "navigate") {
                router.push(`/beat/${postId}`);
            } else if (action === "like") {
                if (userLike) {
                    deleteLike({
                        variables: {
                            like_id: userLike!.like_id,
                        },
                        onCompleted: () => {
                            setUserLike(undefined);
                            setLikesCount(likesCount - 1);
                            handleLikesCountChange();
                        },
                        onError: (error) => {
                            setAlert(error.message);
                        },
                    });
                } else {
                    insertLike({
                        variables: {
                            post_id: postId,
                            user_id: user!.userId,
                        },
                        onCompleted: (data) => {
                            setUserLike(data.insert_likes_one!);
                            setLikesCount(likesCount + 1);
                            handleLikesCountChange();
                        },
                        onError: (error) => {
                            setAlert(error.message);
                        },
                    });
                }
            }
        };
    }, [deleteLike, insertLike, userLike, likesCount, router, user]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleDelete = () => {
        deletePost({
            variables: {
                post_id: post.post_id,
            },
            onCompleted: () => {
                if (redirectOnDelete) {
                    router.push("/");
                } else {
                    refetch && refetch();
                }
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

        const result = await updatePost({
            variables: {
                post_id: post.post_id,
                post_text: editingText,
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

    const handlePostChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditingText(e.target.value);
    };

    const handleAlertClose = (_: SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") return;
        setAlert(null);
    };

    const handleLikesCountChange = () => {
        setIsLikeCountChanging(true);
        setTimeout(() => {
            setIsLikeCountChanging(false);
        }, 600);
    };

    return (
        <Card variant="outlined" className="dark:bg-light-black dark:hover:bg-pale-black">
            <CardHeader
                onClick={() => handlePostClick(post.post_id)}
                style={addNavigation ? { cursor: "pointer" } : {}}
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
                    />
                }
            />
            <CardContent style={{ paddingTop: 4, paddingBottom: 0 }}>
                {isEditing ? (
                    <Stack>
                        <TextField
                            value={editingText}
                            onChange={handlePostChange}
                            multiline
                            rows={isMobile ? 12 : 7}
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
                    <Typography variant="body1" component="p" onClick={() => handlePostClick(post.post_id)} style={addNavigation ? { cursor: "pointer" } : {}}>
                        {text}
                    </Typography>
                )}
                <BottomNavigation showLabels style={{ backgroundColor: "inherit" }} onChange={handleBottomNavigationClick}>
                    {addNavigation ? <BottomNavigationAction value={{ postId: post.post_id, action: "navigate" }} disableRipple /> : null}
                    <BottomNavigationAction
                        disabled={!addNavigation || isEditing}
                        value={{ postId: post.post_id, action: "navigate" }}
                        sx={{ padding: 0 }}
                        icon={<BottomNavigationActionIcon icon={<ChatBubbleOutlineIcon color={anyUserComments ? "primary" : "inherit"} />} count={commentsCount} />}
                    />
                    <BottomNavigationAction
                        disabled={!user || isEditing}
                        value={{ postId: post.post_id, action: "like" }}
                        icon={
                            <BottomNavigationActionIcon
                                icon={
                                    <FavoriteIcon
                                        sx={{
                                            transition: "transform 0.6s",
                                            transform: isLikeCountChanging ? "scale(1.4)" : "scale(1)",
                                        }}
                                        color={userLike ? "error" : "inherit"}
                                    />
                                }
                                count={likesCount}
                            />
                        }
                    />
                    {addNavigation ? <BottomNavigationAction value={{ postId: post.post_id, action: "navigate" }} disableRipple /> : null}
                </BottomNavigation>
                <Snackbar open={!!alert} autoHideDuration={6000} onClose={handleAlertClose}>
                    <Alert severity="error" elevation={6} variant="filled">
                        {alert}
                    </Alert>
                </Snackbar>
            </CardContent>
        </Card>
    );
});

export default Post;

"use client";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { Container, Typography, Box, Stack, Button, Skeleton, Tabs, Tab } from "@mui/material";
import Image from "next/image";
import { useCurrentUser } from "../providers/CurrentUserProvider";
import { PostSkeleton } from "../components/PostSkeleton";
import EditIcon from "@mui/icons-material/Edit";
import { DateTime } from "luxon";
import EditProfile from "../components/EditProfile";
import { useCallback, useEffect, useState } from "react";
import CircleImageWrapper from "../components/CircleImageWrapper";
import { useGetProfileDataLazyQuery } from "@/gql/graphql";
import Post from "../components/Post";
import { Post as PostType } from "@/types/Post";
import { ApolloQueryResult } from "@apollo/client";

const formatJoinedDate = (createdAt: string) => {
    const joinedDate = DateTime.fromISO(createdAt);
    return `Joined ${joinedDate.toFormat("MMMM yyyy")}`;
};

type ProfileTabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
};

function ProfileTabPanel(props: ProfileTabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const ProfilePage = () => {
    const { user } = useCurrentUser();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [tabValue, setTabValue] = useState(0);
    const [getProfileDataQuery] = useGetProfileDataLazyQuery();
    const [refetchProfileData, setRefetchProfileData] = useState<() => Promise<ApolloQueryResult<any>> | undefined>();
    const [myPosts, setMyPosts] = useState<PostType[]>([]);
    const [myCommentedPosts, setMyCommentedPosts] = useState<PostType[]>([]);
    const [myLikedPosts, setMyLikedPosts] = useState<PostType[]>([]);

    useEffect(() => {
        if (!user) return;

        const getProfileData = async (userName: string) => {
            const { data, refetch } = await getProfileDataQuery({
                variables: {
                    user_name: userName,
                },
            });

            setRefetchProfileData(refetch);
            setMyPosts(data?.posts ?? []);
            setMyCommentedPosts(data?.comments.map((c) => c.post) ?? []);
            setMyLikedPosts(data?.likes.map((c) => c.post) ?? []);
        };
        getProfileData(user.userName);
    }, [getProfileDataQuery, user]);

    const handleEditProfile = useCallback(() => {
        if (!user) return;
        setName(user.name);
        setUserName(user.userName);
        setOpen(true);
    }, [user]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    if (!user) {
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
                    <Box sx={{ my: 2, width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs value={tabValue} onChange={handleTabChange}>
                                <Tab id="profile-tab-beats" label="My Beats" />
                                <Tab id="profile-tab-comments" label="Commented" />
                                <Tab id="profile-tab-likes" label="Liked" />
                            </Tabs>
                        </Box>
                        <ProfileTabPanel value={tabValue} index={0}>
                            <Stack spacing={4}>
                                {[...new Array(20)].map((_, index) => (
                                    <PostSkeleton key={index} />
                                ))}
                            </Stack>
                        </ProfileTabPanel>
                    </Box>
                </Box>
            </Container>
        );
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
                        <Box sx={{ flex: 1 }} />
                        <Button variant="outlined" color="inherit" startIcon={<EditIcon />} sx={{ height: 40, borderRadius: 3 }} onClick={handleEditProfile}>
                            Edit Profile
                        </Button>
                    </Stack>

                    <Typography sx={{ fontWeight: 600, fontSize: "2rem", lineHeight: 1.2 }}>{user.name}</Typography>
                    <Typography sx={{ fontSize: "1.25rem", color: "#6c757d" }}>@{user.userName}</Typography>
                    <Typography variant="caption">{formatJoinedDate(user.createdAt)}</Typography>
                </Stack>
                <Box sx={{ my: 2, width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs value={tabValue} onChange={handleTabChange}>
                            <Tab id="profile-tab-beats" label="My Beats" />
                            <Tab id="profile-tab-comments" label="Commented" />
                            <Tab id="profile-tab-likes" label="Liked" />
                        </Tabs>
                    </Box>
                    <ProfileTabPanel value={tabValue} index={0}>
                        <Stack spacing={4}>
                            {myPosts.map((post) => (
                                <Post key={post.post_id} post={post} addNavigation={true} refetch={refetchProfileData} />
                            ))}
                        </Stack>
                    </ProfileTabPanel>
                    <ProfileTabPanel value={tabValue} index={1}>
                        {myCommentedPosts.map((post) => (
                            <Post key={post.post_id} post={post} addNavigation={true} refetch={refetchProfileData} />
                        ))}
                    </ProfileTabPanel>
                    <ProfileTabPanel value={tabValue} index={2}>
                        {myLikedPosts.map((post) => (
                            <Post key={post.post_id} post={post} addNavigation={true} refetch={refetchProfileData} />
                        ))}
                    </ProfileTabPanel>
                </Box>
            </Container>
            <EditProfile
                dialogTitle="edit profile"
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                name={name}
                setName={setName}
                userName={userName}
                setUserName={setUserName}
            />
        </>
    );
};

export default withPageAuthRequired(ProfilePage, { returnTo: "/" });

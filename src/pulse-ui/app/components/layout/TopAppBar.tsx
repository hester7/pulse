"use client";

import { AppBar, Avatar, Box, IconButton, Slide, Toolbar, useScrollTrigger } from "@mui/material";
import { LogoButton } from "./LogoButton";
import { LogoText } from "./LogoText";
import { User } from "./User";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import GuestUser from "./GuestUser";
import { Dispatch, SetStateAction, useState } from "react";
import { SignIn } from "../SignIn";
import GitHubIcon from "@mui/icons-material/GitHub";

function HideOnScroll({ children }: { children: React.ReactElement }) {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

type TopAppBarProps = {
    isSignInOpen: boolean;
    setIsSignInOpen: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
    user: UserProfile | undefined;
};

export default function TopAppBar(props: TopAppBarProps) {
    const { isSignInOpen, setIsSignInOpen, isLoading, user } = props;
    const [userAvatarRef, setUserAvatarRef] = useState<HTMLElement | null>(null);

    return (
        <>
            <HideOnScroll>
                <AppBar>
                    <Toolbar variant="dense" sx={{ minHeight: 50, height: 50 }}>
                        <LogoButton>
                            <LogoText />
                        </LogoButton>
                        <Box sx={{ flex: 1 }} />
                        <a href="https://github.com/hester7/pulse" target="_blank" rel="noopener noreferrer">
                            <IconButton sx={{ p: 0 }}>
                                <Avatar
                                    alt="Github"
                                    imgProps={{ referrerPolicy: "no-referrer" }}
                                    sx={(theme) => ({
                                        color: theme.palette.primary.main,
                                        backgroundColor: "#fff",
                                    })}
                                >
                                    <GitHubIcon fontSize="large" />
                                </Avatar>
                            </IconButton>
                        </a>
                        <div ref={(node) => setUserAvatarRef(node)}>{!isLoading && user ? <User /> : <GuestUser isLoading={isLoading} />}</div>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
            <SignIn open={isSignInOpen} setOpen={setIsSignInOpen} anchorEl={userAvatarRef} />
        </>
    );
}

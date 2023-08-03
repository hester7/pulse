"use client";

import { AppBar, Avatar, Box, IconButton, Slide, Toolbar, useScrollTrigger } from "@mui/material";
import { LogoButton } from "./LogoButton";
import { LogoText } from "./LogoText";
import { User } from "./User";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import GuestUser from "./GuestUser";
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
    isLoading: boolean;
    user: UserProfile | undefined;
};

export default function TopAppBar(props: TopAppBarProps) {
    const { isLoading, user } = props;

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
                        {!isLoading && user ? <User /> : <GuestUser isLoading={isLoading} />}
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </>
    );
}

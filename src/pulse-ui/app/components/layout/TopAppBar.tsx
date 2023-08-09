"use client";

import { AppBar, Avatar, Box, IconButton, Slide, Toolbar, useScrollTrigger } from "@mui/material";
import { LogoButton } from "./LogoButton";
import { LogoText } from "./LogoText";
import { User } from "./User";
import GuestUser from "./GuestUser";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useCurrentUser } from "@/app/providers/CurrentUserProvider";

function HideOnScroll({ children }: { children: React.ReactElement }) {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function TopAppBar() {
    const { user } = useCurrentUser();

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
                        {user ? <User /> : <GuestUser />}
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </>
    );
}

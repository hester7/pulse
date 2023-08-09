"use client";

import { useState } from "react";
import { BottomAppBar } from "./BottomAppBar";
import TopAppBar from "./TopAppBar";
import { CreatePost } from "../CreatePost";
import { Toolbar } from "@mui/material";
import { SignIn } from "../SignIn";
import { useCurrentUser } from "@/app/providers/CurrentUserProvider";

type AppBarsProps = {
    children: React.ReactNode;
};

export const AppBars = ({ children }: AppBarsProps) => {
    const { user } = useCurrentUser();
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);

    const handleFabClick = () => {
        if (user) {
            setIsCreatePostOpen(true);
        } else {
            setIsSignInOpen(true);
        }
    };

    return (
        <>
            <TopAppBar />
            <CreatePost open={isCreatePostOpen} setOpen={setIsCreatePostOpen} />
            <SignIn open={isSignInOpen} setOpen={setIsSignInOpen} />
            {children}
            <Toolbar />
            <BottomAppBar handleFabClick={handleFabClick} />
        </>
    );
};

"use client";

import { useState } from "react";
import { BottomAppBar } from "./BottomAppBar";
import TopAppBar from "./TopAppBar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CreatePost } from "../CreatePost";
import { Toolbar } from "@mui/material";
import { SignIn } from "../SignIn";

type AppBarsProps = {
    children: React.ReactNode;
};

export const AppBars = ({ children }: AppBarsProps) => {
    const { isLoading, user } = useUser();
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
            <TopAppBar isLoading={isLoading} user={user} />
            <CreatePost open={isCreatePostOpen} setOpen={setIsCreatePostOpen} />
            <SignIn open={isSignInOpen} setOpen={setIsSignInOpen} />
            {children}
            <Toolbar />
            <BottomAppBar handleFabClick={handleFabClick} />
        </>
    );
};

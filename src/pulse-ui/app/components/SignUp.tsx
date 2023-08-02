"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "../providers/CurrentUserProvider";
import EditProfile from "./EditProfile";

export const SignUp = () => {
    const { user, session } = useCurrentUser();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        if (user === undefined || user || !session) return;

        // If user is null, show the dialog
        setName(session.user.name);
        setUserName(session.user.nickname);
        setOpen(true);
    }, [session, user]);

    const handleClose = () => {};

    return (
        <EditProfile
            dialogTitle="welcome to pulse"
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            name={name}
            setName={setName}
            userName={userName}
            setUserName={setUserName}
        />
    );
};

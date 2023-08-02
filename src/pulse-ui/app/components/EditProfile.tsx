"use client";

import { ChangeEvent, memo, useCallback, useState } from "react";
import { Dialog, DialogContent, DialogActions, TextField, Button, Box, Alert, Theme, DialogTitle, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Users_Update_Column, useUpsertUserMutation } from "@/gql/graphql";
import { useCurrentUser } from "../providers/CurrentUserProvider";
import { logo } from "@/fonts";

interface EditProfileProps {
    dialogTitle: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    handleClose: () => void;
    name: string;
    setName: (name: string) => void;
    userName: string;
    setUserName: (userName: string) => void;
}

const EditProfile = memo<EditProfileProps>(function EditProfile({ open, setOpen, handleClose, dialogTitle, name, setName, userName, setUserName }: EditProfileProps) {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const { setUser, session } = useCurrentUser();
    const [nameError, setNameError] = useState<string | null>(null);
    const [userNameError, setUserNameError] = useState<string | null>(null);
    const [alert, setAlert] = useState<string | null>(null);
    const [upsertUser] = useUpsertUserMutation();

    const handleNameChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.value.trim()) {
                setNameError("Required");
            } else {
                setNameError(null);
            }
            setName(e.target.value);
        },
        [setName]
    );

    const handleUserNameChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.value.trim()) {
                setUserNameError("Required");
            } else {
                setUserNameError(null);
            }
            setUserName(e.target.value);
        },
        [setUserName]
    );

    const handleSave = () => {
        setAlert(null);

        if (!name.trim() || !userName.trim()) {
            return;
        }

        upsertUser({
            variables: {
                user_id: session!.user.sub,
                user_name: userName,
                email: session!.user.email,
                name: name,
                picture: session!.user.picture,
                last_login_at: new Date().toISOString(),
                update_columns: [Users_Update_Column.Name, Users_Update_Column.UserName],
            },
            onCompleted: (data) => {
                const user = data?.insert_users_one;
                setUser({
                    userId: user!.user_id,
                    userName: user!.user_name,
                    name: user!.name ?? "",
                    email: user!.email,
                    picture: user!.picture ?? "",
                    createdAt: user!.created_at,
                });
                setOpen(false);
            },
            onError: (error) => {
                if (error.message.includes("users_user_name_key")) {
                    setUserNameError("User name already exists.");
                } else {
                    setAlert(error.message);
                }
            },
        });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <Box
                sx={{
                    width: isMobile ? "100%" : 400,
                }}
            >
                <DialogTitle>
                    <div>
                        <Typography variant="h3" fontFamily={logo.style.fontFamily} align="center">
                            {dialogTitle}
                        </Typography>
                    </div>
                </DialogTitle>
                <DialogContent sx={{ paddingBottom: 0 }}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={handleNameChange}
                        fullWidth
                        style={{ marginTop: "8px", marginBottom: "20px" }}
                        color="info"
                        error={Boolean(nameError)}
                        helperText={nameError}
                    />
                    <TextField
                        label="User Name"
                        value={userName}
                        onChange={handleUserNameChange}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                        color="info"
                        error={Boolean(userNameError)}
                        helperText={userNameError}
                    />
                </DialogContent>
                <DialogActions sx={{ paddingLeft: "24px", paddingRight: "24px", paddingBottom: "24px" }}>
                    <Button variant="contained" color="primary" onClick={handleSave} fullWidth sx={{ borderRadius: 50, height: "50px" }}>
                        Save
                    </Button>
                </DialogActions>
                {alert && <Alert severity="error">{alert}</Alert>}
            </Box>
        </Dialog>
    );
});

export default EditProfile;

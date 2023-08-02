"use client";

import { Avatar, Box, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import FaceIcon from "@mui/icons-material/Face";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";

export const User = () => {
    const { user } = useUser();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0, paddingLeft: 4 }}>
            <Tooltip title={user!.name}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {user!.picture ? (
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
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem key="header" sx={{ pointerEvents: "none" }}>
                    <Typography textAlign="center" fontWeight="600">
                        {user!.name}
                    </Typography>
                </MenuItem>
                <Divider />
                <Link href="/profile">
                    <MenuItem key="profile" onClick={handleCloseUserMenu}>
                        <ListItemIcon>
                            <Person2Icon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </MenuItem>
                </Link>
                <Divider />
                <Link href="/api/auth/logout">
                    <MenuItem key="logout" onClick={handleCloseUserMenu}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Sign Out</ListItemText>
                    </MenuItem>
                </Link>
            </Menu>
        </Box>
    );
};

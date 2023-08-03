"use client";

import { Typography, Dialog, Box, DialogContent, Stack, DialogActions, Button } from "@mui/material";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import Link from "next/link";

type SignInProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

export const SignIn = ({ open, setOpen }: SignInProps) => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <Box>
                <DialogContent sx={{ paddingBottom: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <HeadphonesIcon fontSize="large" />
                        <div>
                            <Typography noWrap={true} variant={isMobile ? "body1" : "h6"}>
                                Sign in to start making beats
                            </Typography>
                        </div>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ paddingLeft: "24px", paddingRight: "24px", paddingBottom: "24px" }}>
                    <Link href="/api/auth/login">
                        <Button variant="contained" color="primary" fullWidth sx={{ borderRadius: 50 }}>
                            Sign In
                        </Button>
                    </Link>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

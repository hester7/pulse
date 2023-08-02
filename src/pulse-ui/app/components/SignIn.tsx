"use client";

import { Typography, Dialog, Box, DialogContent, Stack } from "@mui/material";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCallback, useEffect, useState } from "react";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

type SignInProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    anchorEl: HTMLElement | null;
};

export const SignIn = ({ open, setOpen, anchorEl }: SignInProps) => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const [dialogPosition, setDialogPosition] = useState<{ top: number; left: number } | null>(null);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const updateDialogPosition = useCallback(() => {
        if (anchorEl) {
            const rect = anchorEl.getBoundingClientRect();
            const top = rect.bottom - 20;
            const left = rect.left;
            setDialogPosition({ top, left });
        }
    }, [anchorEl]);

    useEffect(() => {
        if (open) {
            updateDialogPosition();
        }
    }, [open, updateDialogPosition]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    position: "fixed",
                    top: dialogPosition?.top,
                    left: dialogPosition?.left,
                    transform: "translate(-100%, 0)",
                },
            }}
        >
            <Box>
                <DialogContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <HeadphonesIcon fontSize="large" />
                        <div>
                            <Typography noWrap={true} variant={isMobile ? "body1" : "h6"}>
                                Sign in to start making beats
                            </Typography>
                        </div>
                        <ArrowOutwardIcon
                            fontSize="large"
                            sx={(theme) => ({
                                color: theme.palette.primary.main,
                            })}
                        />
                    </Stack>
                </DialogContent>
            </Box>
        </Dialog>
    );
};

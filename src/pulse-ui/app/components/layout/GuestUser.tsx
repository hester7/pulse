import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FaceIcon from "@mui/icons-material/Face";
import Link from "next/link";

type GuestUserProps = {
    isLoading: boolean;
};

const GuestUser = ({ isLoading }: GuestUserProps) => {
    return (
        <Box sx={{ flexGrow: 0, paddingLeft: 4 }}>
            <Tooltip title={isLoading ? "" : "Sign In"}>
                {isLoading ? (
                    <IconButton sx={{ p: 0 }}>
                        <Avatar
                            alt="Guest"
                            imgProps={{ referrerPolicy: "no-referrer" }}
                            sx={(theme) => ({
                                color: theme.palette.primary.main,
                                backgroundColor: "#fff",
                            })}
                        >
                            <FaceIcon fontSize="large" />
                        </Avatar>
                    </IconButton>
                ) : (
                    <Link href="/api/auth/login">
                        <IconButton sx={{ p: 0 }}>
                            <Avatar
                                alt="Guest"
                                imgProps={{ referrerPolicy: "no-referrer" }}
                                sx={(theme) => ({
                                    color: theme.palette.primary.main,
                                    backgroundColor: "#fff",
                                })}
                            >
                                <FaceIcon fontSize="large" />
                            </Avatar>
                        </IconButton>
                    </Link>
                )}
            </Tooltip>
        </Box>
    );
};

export default GuestUser;

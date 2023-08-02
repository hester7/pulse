import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Person2Icon from "@mui/icons-material/Person2";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

type BottomAppBarProps = {
    handleFabClick: () => void;
};

export const BottomAppBar = ({ handleFabClick }: BottomAppBarProps) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
                <Toolbar
                    variant="dense"
                    sx={{
                        minHeight: 40,
                        height: 40,
                    }}
                >
                    <Stack direction="row" alignItems="center" sx={{ flex: 1 }}>
                        <Box sx={{ flex: 1 }}>
                            <Link href="/">
                                <IconButton aria-label="Home" sx={{ width: "100%", borderRadius: 0 }}>
                                    <HomeIcon />
                                </IconButton>
                            </Link>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Link href="/profile">
                                <IconButton aria-label="Profile" sx={{ width: "100%", borderRadius: 0 }}>
                                    <Person2Icon />
                                </IconButton>
                            </Link>
                        </Box>
                    </Stack>
                    <Fab color="secondary" aria-label="add" onClick={handleFabClick} sx={{ position: "absolute", zIndex: 1, bottom: 52, right: 12 }}>
                        <AddIcon />
                    </Fab>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

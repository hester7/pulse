import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { logo } from "@/fonts";

// TODO: doesn't always center vertically
const Loading = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
            }}
        >
            <CircularProgress size={100} />
            <Typography variant="h3" className="pt-4" fontFamily={logo.style.fontFamily}>
                loading
            </Typography>
        </Box>
    );
};

export default Loading;

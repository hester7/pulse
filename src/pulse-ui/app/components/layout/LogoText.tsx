import Typography from "@mui/material/Typography";
import { logo } from "@/fonts";

export const LogoText = () => {
    return (
        <Typography variant="h3" fontFamily={logo.style.fontFamily} className="pl-1">
            pulse
        </Typography>
    );
};

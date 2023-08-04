import IconButton from "@mui/material/IconButton";
import { AppIcon } from "../svg/AppIcon";
import Link from "next/link";

type LogoButtonProps = {
    children: React.ReactNode;
};

export const LogoButton = ({ children }: LogoButtonProps) => {
    return (
        <Link href="/">
            <IconButton disableRipple>
                <AppIcon sx={{ width: "100px", height: "50px" }} />
                {children}
            </IconButton>
        </Link>
    );
};

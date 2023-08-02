import Link from "next/link";
import { Avatar } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

type CardHeaderAvatarProps = {
    userName: string;
    picture?: string;
};

export default function CardHeaderAvatar({ userName, picture }: CardHeaderAvatarProps) {
    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <Link href={`/${userName}`} onClick={handleClick}>
            {picture ? (
                <Avatar alt="User" src={picture} imgProps={{ referrerPolicy: "no-referrer" }} />
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
        </Link>
    );
}

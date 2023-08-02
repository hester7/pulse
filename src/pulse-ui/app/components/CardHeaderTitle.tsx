import { User } from "@/types/User";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { EditButtons } from "./EditButtons";
import Link from "next/link";

type CardHeaderTitleProps = {
    userName: string;
    name: string;
    isMobile: boolean;
    formattedDate: string;
    formattedDateTooltip: string;
    user: User | null | undefined;
    handleEdit: () => void;
    handleDelete: () => void;
    handleSave: () => Promise<boolean>;
    handleCancel: () => void;
};

export default function CardHeaderTitle(props: CardHeaderTitleProps) {
    const { userName, name, isMobile, formattedDate, formattedDateTooltip, user, handleEdit, handleDelete, handleSave, handleCancel } = props;

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return isMobile ? (
        <Stack direction="row" alignItems="center">
            <Stack>
                <Link href={`/${userName}`} onClick={handleClick}>
                    <Typography style={{ fontWeight: "bold", paddingRight: 16 }}>{name}</Typography>
                </Link>
                <Stack direction="row">
                    <Link href={`/${userName}`} onClick={handleClick}>
                        <Typography style={{ fontSize: "0.9rem" }}>@{userName}</Typography>
                    </Link>
                    <Tooltip title={formattedDateTooltip}>
                        <Typography style={{ fontSize: "0.9rem", paddingLeft: 4 }}>· {formattedDate}</Typography>
                    </Tooltip>
                </Stack>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            {user?.userName === userName ? <EditButtons onEdit={handleEdit} onDelete={handleDelete} onSave={handleSave} onCancel={handleCancel} type="beat" /> : null}
        </Stack>
    ) : (
        <Stack direction="row" alignItems="center">
            <Link href={`/${userName}`} onClick={handleClick}>
                <Typography style={{ fontWeight: "bold", paddingRight: 16 }}>{name}</Typography>
            </Link>
            <Link href={`/${userName}`} onClick={handleClick}>
                <Typography style={{ fontSize: "0.9rem" }}>@{userName}</Typography>
            </Link>
            <Tooltip title={formattedDateTooltip}>
                <Typography style={{ fontSize: "0.9rem", paddingLeft: 4 }}>· {formattedDate}</Typography>
            </Tooltip>
            <Box sx={{ flexGrow: 1 }} />
            {user?.userName === userName ? <EditButtons onEdit={handleEdit} onDelete={handleDelete} onSave={handleSave} onCancel={handleCancel} type="beat" /> : null}
        </Stack>
    );
}

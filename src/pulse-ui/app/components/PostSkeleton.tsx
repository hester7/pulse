import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export const PostSkeleton = () => {
    return (
        <Card variant="outlined" className="dark:bg-light-black">
            <CardHeader
                style={{ paddingBottom: 0 }}
                avatar={<Skeleton variant="circular" width={40} height={40} />}
                title={
                    <Stack direction="row" spacing={4}>
                        <Skeleton variant="text" width={100} />
                        <Skeleton variant="text" width={100} />
                    </Stack>
                }
            />
            <CardContent style={{ paddingTop: 0, paddingBottom: 8 }}>
                <Skeleton variant="text" width="100%" height={100} />
                <Stack direction="row" spacing={20} alignItems="center" justifyContent="center">
                    <Stack direction="row" spacing={4} alignItems="center">
                        <Skeleton variant="circular" width={24} height={24} />
                        <Skeleton variant="text" width={24} />
                    </Stack>
                    <Stack direction="row" spacing={4} alignItems="center">
                        <Skeleton variant="circular" width={24} height={24} />
                        <Skeleton variant="text" width={24} />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

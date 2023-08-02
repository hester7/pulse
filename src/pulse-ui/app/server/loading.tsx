import { Stack } from "@mui/material";
import { PostSkeleton } from "../components/PostSkeleton";

export default function Loading() {
    return (
        <Stack spacing={4}>
            {[...new Array(20)].map((_, index) => (
                <PostSkeleton key={index} />
            ))}
        </Stack>
    );
}

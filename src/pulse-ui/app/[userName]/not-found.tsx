import { Box, Container, Stack, Typography } from "@mui/material";

export default function NotFound() {
    return (
        <Container>
            <Stack alignItems="center" sx={{ flex: 1, my: 4 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h5">{"This account doesn't exist"}</Typography>
                    <Typography variant="caption">{"Try searching for another."}</Typography>
                </Box>
            </Stack>
        </Container>
    );
}

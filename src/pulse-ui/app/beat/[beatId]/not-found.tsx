import { Box, Container, Stack, Typography } from "@mui/material";

export default function NotFound() {
    return (
        <Container>
            <Stack alignItems="center" sx={{ flex: 1, my: 4 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h5">{"Hmm...this page doesn’t exist."}</Typography>
                    <Typography variant="caption">{"Try searching for something else."}</Typography>
                </Box>
            </Stack>
        </Container>
    );
}

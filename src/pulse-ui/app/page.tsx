import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { SignUp } from "./components/SignUp";
import { Timeline } from "./components/Timeline";

export default function Index() {
    return (
        <>
            <Container>
                <Box sx={{ my: 2 }}>
                    <Timeline />
                </Box>
            </Container>
            <SignUp />
        </>
    );
}

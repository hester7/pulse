// SOURCE: https://github.com/mui/material-ui/issues/34898#issuecomment-1506990380

"use client";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { NextThemeProvider } from "./NextThemeProvider";
import { MuiProvider } from "./MuiProvider";

type ProvidersProps = {
    children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
    return (
        <NextThemeProvider>
            <MuiProvider>
                <UserProvider>{children}</UserProvider>
            </MuiProvider>
        </NextThemeProvider>
    );
}

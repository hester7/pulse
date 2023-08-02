// SOURCE: https://github.com/mui/material-ui/issues/34898#issuecomment-1506990380

"use client";

import { DEFAULT_THEME, createTheme } from "@/theme";
import { ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";

export const MuiProvider = ({ children }: { children: React.ReactNode }) => {
    const { theme: themeState } = useTheme();
    const themeName = themeState === "dark" || themeState === "light" ? themeState : DEFAULT_THEME;
    const theme = createTheme(themeName);

    return (
        // CssBaseline causes the theme switch to stop working
        <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
};

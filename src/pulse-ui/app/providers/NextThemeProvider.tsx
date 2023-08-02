// SOURCE: https://github.com/mui/material-ui/issues/34898#issuecomment-1506990380

"use client";

import { DEFAULT_THEME } from "@/theme";
import { ThemeProvider } from "next-themes";

export const NextThemeProvider = ({ children }: { children: React.ReactNode }) => (
    // Separate next-themes Provider from MUI, so is does not get rerendered on theme switch
    // Set attribute to "class" for TailwindCSS: https://tailwindcss.com/docs/dark-mode, https://github.com/pacocoursey/next-themes#with-tailwind
    // Then you can use TailwindCSS like this: <div class="bg-white dark:bg-black">
    <ThemeProvider attribute="class" defaultTheme={DEFAULT_THEME}>
        {children}
    </ThemeProvider>
);

"use client";

import { IconButton, Tooltip } from "@mui/material";
import { useTheme as useNextTheme } from "next-themes";
import DarkModeIcon from "@mui/icons-material/DarkModeTwoTone";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useCallback, useEffect, useMemo, useState } from "react";

export const ThemeButton = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useNextTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleMode = useCallback(() => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    }, [theme, setTheme]);

    const tooltipContent = useMemo(() => {
        return theme === "light" ? "Dark Mode" : "Light Mode";
    }, [theme]);

    // TODO: better than this?
    if (!mounted) {
        return <></>;
    }

    return (
        <Tooltip title={tooltipContent}>
            <IconButton aria-label="mode" size="medium" onClick={toggleMode}>
                {theme === "light" ? <DarkModeIcon fontSize="inherit" /> : <LightModeIcon fontSize="inherit" />}
            </IconButton>
        </Tooltip>
    );
};

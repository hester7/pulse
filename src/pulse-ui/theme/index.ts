import { PaletteMode, alpha, createTheme as ct, darken, lighten } from "@mui/material";

export const DEFAULT_THEME: "dark" | "light" = "dark";

export const getOtherTheme = (theme: string | undefined): "dark" | "light" => {
    switch (theme) {
        case "dark":
            return "light";
        case "light":
            return "dark";
        case "system":
        default:
            return DEFAULT_THEME;
    }
};

export const createTheme = (mode: PaletteMode) => {
    const base = ct({
        palette: {
            mode,
            primary: {
                main: "#4263F5",
            },
            secondary: {
                main: "#09A69F",
            },
            error: {
                main: "#e63c48",
            },
            warning: {
                main: "#FFFAA0",
            },
            success: {
                main: "#098551",
            },
        },
        spacing: 4,
    });

    return ct(
        base,
        mode === "light"
            ? {
                  palette: {
                      info: "#4c4c4c",
                  },
              }
            : {
                  palette: {
                      info: "#fff",
                  },
              }
    );
};

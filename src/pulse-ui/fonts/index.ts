import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

// TODO: does this need to be local?
export const logo = localFont({ src: "./Tourney-VariableFont_wdth,wght.ttf" });

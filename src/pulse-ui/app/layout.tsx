import { inter } from "@/fonts";
import Providers from "./providers/Providers";
import "./globals.css";
import { defaultMetadata } from "./metadata";
import { AppBars } from "./components/layout/AppBars";

export const metadata = defaultMetadata;

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    // suppressHydrationWarning is for next-themes - see: https://github.com/pacocoursey/next-themes#with-app
    <html lang="en" suppressHydrationWarning>
        <head />
        <body className={inter.className}>
            <Providers>
                <AppBars>{children}</AppBars>
            </Providers>
        </body>
    </html>
);

export default RootLayout;

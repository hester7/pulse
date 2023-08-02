// SOURCE: https://github.com/mui/material-ui/issues/34898#issuecomment-1506990380

"use client";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { NextThemeProvider } from "./NextThemeProvider";
import { MuiProvider } from "./MuiProvider";
import { CurrentUserProvider } from "@/app/providers/CurrentUserProvider";
import ApolloProviderWrapper from "./ApolloProviderWrapper";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";

type ProvidersProps = {
    children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
    return (
        <NextThemeProvider>
            <MuiProvider>
                <UserProvider>
                    <ApolloProviderWrapper>
                        {(makeClient, session) => (
                            <ApolloNextAppProvider makeClient={makeClient}>
                                <CurrentUserProvider session={session}>{children}</CurrentUserProvider>
                            </ApolloNextAppProvider>
                        )}
                    </ApolloProviderWrapper>
                </UserProvider>
            </MuiProvider>
        </NextThemeProvider>
    );
}

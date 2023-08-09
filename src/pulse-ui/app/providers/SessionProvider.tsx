import { getSession, Session } from "@auth0/nextjs-auth0";
import ApolloProviderWrapper from "./ApolloProviderWrapper";
import { CurrentUserProvider } from "./CurrentUserProvider";

/*
NOTES:
- Important: Limitations of the App Directory
    - https://github.com/auth0/nextjs-auth0#important-limitations-of-the-app-directory
*/

type SessionProviderProps = {
    children: React.ReactNode;
};

export default async function SessionProvider({ children }: SessionProviderProps) {
    const session: Session | null = (await getSession()) ?? null;

    return (
        <ApolloProviderWrapper session={session}>
            <CurrentUserProvider session={session}>{children}</CurrentUserProvider>
        </ApolloProviderWrapper>
    );
}

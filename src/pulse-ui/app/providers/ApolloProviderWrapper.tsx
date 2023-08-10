// https://github.com/apollographql/apollo-client-nextjs

/*
NOTES:
- Per Apollo:
  - You should not be recreating your whole Apollo Client every time the token changes.
  - For that reason, the ApolloNextAppProvider will also never recreate the client.
  - As a result, the client will always only carry references to variables in scope during the first render of that component, never to later ones.
  - That's why the ref works, but state does not.
*/

// TODO: this only has to be a client component because functions cannot be passed directly to Client Components
// unless you explicitly expose it by marking it with "use server". You have to opt in to Server Actions in order to use them.
"use client";

import { ApolloLink, DefaultContext, GraphQLRequest, HttpLink, split } from "@apollo/client";
import { NextSSRInMemoryCache, NextSSRApolloClient, SSRMultipartLink, ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { Session } from "@auth0/nextjs-auth0";

type ApolloProviderWrapperProps = {
    children: React.ReactNode;
    session: Session | null;
};

const ApolloProviderWrapper = ({ children, session }: ApolloProviderWrapperProps) => {
    const accessToken = session?.accessToken ?? null;

    const makeClient = () => {
        const httpLink = new HttpLink({
            uri: process.env.NEXT_PUBLIC_HASURA_URL ?? "http://localhost:8081/v1/graphql",
            // TODO: caching?
            fetchOptions: { cache: "no-store" },
        });

        const wsLink =
            typeof window !== "undefined"
                ? new GraphQLWsLink(
                      createClient({
                          url: process.env.NEXT_PUBLIC_HASURA_WS ?? "ws://localhost:8081/v1/graphql",
                          lazy: true,
                          connectionParams: async () => {
                              const headers: Record<string, any> = {};
                              if (accessToken) {
                                  headers.Authorization = `Bearer ${accessToken}`;
                              }
                              return { headers };
                          },
                      })
                  )
                : null;

        const splitLink =
            typeof window !== "undefined" && wsLink != null
                ? split(
                      ({ query }) => {
                          const definition = getMainDefinition(query);
                          return definition.kind === "OperationDefinition" && definition.operation === "subscription";
                      },
                      wsLink,
                      httpLink
                  )
                : ApolloLink.from([
                      // in a SSR environment, if you use multipart features like
                      // @defer, you need to decide how to handle these.
                      // This strips all interfaces with a `@defer` directive from your queries.
                      new SSRMultipartLink({
                          stripDefer: true,
                      }),
                      httpLink,
                  ]);

        const authLink = setContext((_: GraphQLRequest, context: DefaultContext) => {
            const { headers, ...rest } = context;
            if (accessToken) {
                return {
                    headers: {
                        ...headers,
                        authorization: `Bearer ${accessToken}`,
                    },
                    ...rest,
                };
            }

            return {
                headers,
                ...rest,
            };
        });

        return new NextSSRApolloClient({
            link: authLink.concat(splitLink),
            cache: new NextSSRInMemoryCache(),
        });
    };

    return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
};

export default ApolloProviderWrapper;

// https://github.com/apollographql/apollo-client-nextjs

/*
NOTES:
- Per Apollo:
  - You should not be recreating your whole Apollo Client every time the token changes.
  - For that reason, the ApolloNextAppProvider will also never recreate the client.
  - As a result, the client will always only carry references to variables in scope during the first render of that component, never to later ones.
  - That's why the ref works, but state does not.
*/

"use client";

import { ApolloLink, DefaultContext, GraphQLRequest, HttpLink, split } from "@apollo/client";
import { NextSSRInMemoryCache, NextSSRApolloClient, SSRMultipartLink } from "@apollo/experimental-nextjs-app-support/ssr";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Session } from "@auth0/nextjs-auth0";

type ApolloProviderWrapperProps = {
    children: (makeClient: () => NextSSRApolloClient<any>, session: Session | null) => React.ReactNode;
};

const ApolloProviderWrapper = ({ children }: ApolloProviderWrapperProps) => {
    const { user } = useUser();
    const [session, setSession] = useState<Session | null>(null);
    const bearerTokenRef = useRef<string | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                if (!user) {
                    setSession(null);
                    bearerTokenRef.current = null;
                    return;
                }

                const response = await fetch("/api/auth/session");
                if (response.ok) {
                    const data: Session | null = await response.json();
                    setSession(data);
                    bearerTokenRef.current = data?.accessToken ?? null;

                    if (window.location.hostname === "localhost") {
                        console.log("accessToken", data?.accessToken ?? null);
                    }
                } else {
                    setSession(null);
                    bearerTokenRef.current = null;
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchSession();
    }, [user]);

    const makeClient = useCallback(() => {
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
                          // TODO: will have to figure out how to set the auth header for subscriptions
                          //   connectionParams: async () => ({
                          //       headers: {
                          //           Authorization: `Bearer ${bearerTokenRef.current}`,
                          //       },
                          //   }),
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
            if (bearerTokenRef.current) {
                return {
                    headers: {
                        ...headers,
                        authorization: `Bearer ${bearerTokenRef.current}`,
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
    }, []);

    return children(makeClient, session);
};

export default ApolloProviderWrapper;

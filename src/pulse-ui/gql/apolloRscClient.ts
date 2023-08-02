import { DefaultContext, GraphQLRequest, HttpLink } from "@apollo/client";
import { NextSSRInMemoryCache, NextSSRApolloClient } from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { getSession } from "@auth0/nextjs-auth0";
import { setContext } from "@apollo/client/link/context";

const makeClient = () => {
    const httpLink = new HttpLink({
        uri: process.env.NEXT_PUBLIC_HASURA_URL ?? "http://localhost:8081/v1/graphql",
    });

    const authLink = setContext(async (_: GraphQLRequest, context: DefaultContext) => {
        const { headers, ...rest } = context;
        const session = await getSession();
        if (session) {
            return {
                headers: {
                    ...headers,
                    authorization: `Bearer ${session.accessToken}`,
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
        link: authLink.concat(httpLink),
        cache: new NextSSRInMemoryCache(),
    });
};

export const { getClient: getApolloClient } = registerApolloClient(makeClient);

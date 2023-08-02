import { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

// https://hasura.io/learn/graphql/typescript-react-apollo/codegen/
// https://www.youtube.com/watch?v=PYDGjTufGsk&ab_channel=JamieBarton
// https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-apollo
const config: CodegenConfig = {
    schema: [
        {
            [process.env.NEXT_PUBLIC_HASURA_URL as string]: {
                headers: {
                    "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET as string,
                },
            },
        },
    ],
    documents: "./gql/documents/**/*.ts",
    overwrite: true,
    generates: {
        "./gql/graphql.ts": {
            plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
        },
    },
};

export default config;

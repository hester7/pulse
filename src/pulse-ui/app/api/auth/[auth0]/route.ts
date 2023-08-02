import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
    login: handleLogin({
        authorizationParams: {
            audience: process.env.AUTH0_AUDIENCE,
            prompt: "login",
        },
        // TODO: example: click profile button at bottom right when not signed in
        //returnTo: "/",
    }),
    onError(req: Request, error: Error) {
        console.error(`Error in handleAuth: ${error.message}. Request: ${JSON.stringify(req)}`);
    },
});

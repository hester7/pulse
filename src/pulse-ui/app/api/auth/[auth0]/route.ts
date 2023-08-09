import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

/*
NOTES:
- Silent authentication
    - https://auth0.com/docs/authenticate/login/configure-silent-authentication    
    - https://github.com/auth0/nextjs-auth0/issues/44
    - Simply use "none" instead of "login" for "prompt" in the authorizationParams object
- Set the token expiration to 12 hours in the API settings in the Auth0 dashboard

RESOURCES:
- https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md
*/

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

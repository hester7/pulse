import { Session, getSession, withApiAuthRequired, updateSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

/*
NOTES:
- https://github.com/auth0/nextjs-auth0/issues/358
- The Auth0 Next.js package does not allow you to get the access token on the client side
- So, I've created this route to return the session of the logged in user
- The route is protected by the withApiAuthRequired HOC
- Requests to this route without a valid session cookie will fail with 401.

RESOURCES:
- https://community.auth0.com/t/how-to-refresh-an-access-token-in-a-next-js-application/75806
- https://community.auth0.com/t/the-access-token-expired-and-a-refresh-token-is-not-available-the-user-will-need-to-sign-in-again-what-now/89971
- https://github.com/auth0/nextjs-auth0/issues/169
*/

const GET = withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const session: Session | null | undefined = await getSession();

    return NextResponse.json(session ?? null);

    // TODO: I can't figure out how to updateSession and have it persist
    // According to https://github.com/auth0/nextjs-auth0/issues/169, you should be able to directly update the session and have it persist
    // Calling `updateSession` below does not work. An error is thrown.
    // NOTE: this might be the reason it's not persisting: https://github.com/auth0/nextjs-auth0#important-limitations-of-the-app-directory

    // if (!session) {
    //     return NextResponse.json(null);
    // }

    // if (session.accessToken && session.accessTokenExpiresAt) {
    //     // Check if the access token has expired
    //     const currentTime = Math.floor(Date.now() / 1000);
    //     if (session.accessTokenExpiresAt > currentTime) {
    //         return NextResponse.json(session);
    //     }
    // }

    // // If there is a refresh token, use it to get a new access token
    // if (session.refreshToken) {
    //     const refreshResponse = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             grant_type: "refresh_token",
    //             audience: process.env.AUTH0_AUDIENCE,
    //             client_id: process.env.AUTH0_CLIENT_ID,
    //             client_secret: process.env.AUTH0_CLIENT_SECRET,
    //             refresh_token: session.refreshToken,
    //         }),
    //     });

    //     if (refreshResponse.ok) {
    //         const data = await refreshResponse.json();
    //         try {
    //             await updateSession(req, res, { ...session, accessToken: data.access_token, refreshToken: data.refresh_token });
    //         } catch (error) {
    //             console.error(error);
    //         }
    //         return NextResponse.json(session);
    //     }
    // }

    // return NextResponse.json(null);
});

export { GET };

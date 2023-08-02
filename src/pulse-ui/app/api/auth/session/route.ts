import { Session, getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

/*
NOTES:
- https://github.com/auth0/nextjs-auth0/issues/358
- The Auth0 Next.js package does not allow you to get the access token on the client side
- So, I've created this route to return the session of the logged in user
- The route is protected by the withApiAuthRequired HOC
- Requests to this route without a valid session cookie will fail with 401.
*/

const GET = withApiAuthRequired(async () => {
    const session: Session | null | undefined = await getSession();

    return NextResponse.json(session ?? null);
});

export { GET };

"use client";

import { User } from "@/types/User";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Session } from "@auth0/nextjs-auth0";
import { Users_Update_Column, useUpsertUserMutation, useUserByPkLazyQuery } from "@/gql/graphql";
import { useRouter } from "next/navigation";

export interface CurrentUserContextState {
    user: User | null | undefined;
    setUser: Dispatch<SetStateAction<User | null | undefined>>;
    session: Session | null;
}

export const CurrentUserContext = createContext<CurrentUserContextState>({
    user: null,
    setUser: () => {},
    session: null,
});

export const useCurrentUser = () => useContext(CurrentUserContext);

type CurrentUserProviderProps = {
    children: React.ReactNode;
    session: Session | null;
};

export const CurrentUserProvider = ({ children, session }: CurrentUserProviderProps) => {
    const router = useRouter();
    const { isLoading: isUserLoading, user: auth0User } = useUser();
    const [user, setUser] = useState<User | null | undefined>(undefined);
    const [getUserByPkQuery] = useUserByPkLazyQuery();
    const [upsertUser] = useUpsertUserMutation();

    useEffect(() => {
        if (isUserLoading || !auth0User || !session) return;

        const getUserByPk = async (userId: string) => {
            const { data, error } = await getUserByPkQuery({ variables: { user_id: userId } });
            const user = data?.users_by_pk;

            if (error) {
                router.push("/api/auth/login");
                return;
            }

            if (user) {
                setUser({
                    userId: userId,
                    userName: user.user_name,
                    email: user.email,
                    name: user.name ?? "",
                    picture: user.picture ?? "",
                    createdAt: user.created_at,
                });
                upsertUser({
                    variables: {
                        user_id: userId,
                        user_name: user.user_name,
                        email: user.email,
                        name: user.name,
                        picture: auth0User.picture,
                        last_login_at: new Date().toISOString(),
                        update_columns: [Users_Update_Column.Picture, Users_Update_Column.LastLoginAt],
                    },
                });
            } else {
                // Note: this triggers the SignUp modal
                setUser(null);
            }
        };
        getUserByPk(auth0User.sub!);
    }, [auth0User, getUserByPkQuery, isUserLoading, router, session, upsertUser]);

    const value = useMemo<CurrentUserContextState>(() => {
        return {
            user,
            setUser,
            session,
        };
    }, [user, setUser, session]);

    return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
};

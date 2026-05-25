import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    isLoggedIn: boolean;
};

type AuthActions = {
    setAccessToken: (token: string) => void;
    setRefreshToken: (token: string) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    logout: () => void;
};

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>()(
    devtools(
        persist(
            (set) => ({
                accessToken: null,
                refreshToken: null,
                isLoggedIn: false,

                setAccessToken: (token) =>
                    set({ accessToken: token }),

                setRefreshToken: (token) =>
                    set({ refreshToken: token }),

                setIsLoggedIn: (isLoggedIn) =>
                    set({ isLoggedIn }),

                logout: () =>
                    set({
                        accessToken: null,
                        refreshToken: null,
                        isLoggedIn: false,
                    }),
            }),
            {
                name: "auth-storage",
            }
        )
    )
);

export default useAuthStore;

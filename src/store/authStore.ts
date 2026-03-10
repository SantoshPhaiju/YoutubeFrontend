import {createStore} from "zustand/vanilla";
import {devtools} from "zustand/middleware/devtools";
import {persist} from "zustand/middleware/persist";

type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
};

type AuthActions = {
    setAccessToken: (token: string) => void;
    setRefreshToken: (token: string) => void;
    logout: () => void;
};

type AuthStore = AuthState & AuthActions;


const authStore = (set: (fn: Partial<AuthStore>) => void): AuthStore => ({
    accessToken: null,
    refreshToken: null,

    setAccessToken: (token: string) => set({accessToken: token}),
    setRefreshToken: (token: string) => set({refreshToken: token}),
    logout: () => set({accessToken: null, refreshToken: null}),
})

const useAuthStore = createStore(
    devtools(
        persist(authStore, {
            name: "auth-storage",
        })
    )
)

export default useAuthStore;

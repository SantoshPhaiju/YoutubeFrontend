import axios from "axios";
import {deleteCookie, getCookie} from "cookies-next";
import { toast } from "sonner";
import useAuthStore from "@/store/authStore";
import {useLogoutUser} from "@/services/mutations/authMutation";
import useUserStore from "@/store/userStore";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = getCookie('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
);


// ✅ Response interceptor
api.interceptors.response.use(
    (response) => response,

    (error) => {
        const isAuthRoute =
            error.config?.url?.includes("/users/login") ||
            error.config?.url?.includes("/users/register");

        if (error.response?.status === 401 && !isAuthRoute) {
            // remove token
            deleteCookie("accessToken");

            // redirect login
            // window.location.href = "/";
            const logout = useAuthStore((state) => state.logout);
            // useAuthStore.setState({
            //     isLoggedIn: false,
            //     accessToken: null,
            //     refreshToken: null
            // });
            const logoutUser = useLogoutUser();
            const deleteUser = useUserStore((state) => state.deleteUser);

            logoutUser.mutate();
            logout();
            deleteUser();
            toast.error("Your session has expired. Please login again.");


            // if (typeof window !== "undefined") {
            //     window.location.href = "/";
            // }
        }

        return Promise.reject(error);
    }
);

export default api;

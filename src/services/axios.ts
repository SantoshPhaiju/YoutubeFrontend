import axios from "axios";
import {deleteCookie, getCookie} from "cookies-next";

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
        if (error.response?.status === 401) {

            // remove token
            deleteCookie("accessToken");

            // redirect login
            // window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default api;

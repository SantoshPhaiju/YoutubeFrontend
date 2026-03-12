// here we will write the backend communication logic, means sending http request to the backend

import api from "@/services/axios";
import {IApiResponse} from "@/@types/api-response.type";

export const signIn = async ({
                                 email,
                                 password,
                             }: {
    email: string;
    password: string;
}) => {
    try {
        const response = await api.post("/users/login", {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const logout = async (): Promise<IApiResponse<null>> => {
    try {
        const response = await api.post("/users/logout");
        return response.data;
    } catch (error) {
        throw error;
    }
}

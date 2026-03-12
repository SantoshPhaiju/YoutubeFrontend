// here we will write the backend communication logic, means sending http request to the backend

import api from "@/services/axios";

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

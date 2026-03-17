import api from "@/services/axios";
import axios from "axios";
import {cookies} from "next/headers";

// server component will call this
export const getUserChannel = async (username: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/get-channel-data/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

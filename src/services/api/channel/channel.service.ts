
import axios from "axios";
import {cookies} from "next/headers";

// server component will call this
export const getUserChannel = async (username: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    try {
        const url = `/users/get-channel-data/${username}`;
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

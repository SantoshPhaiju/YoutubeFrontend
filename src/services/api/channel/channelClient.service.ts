import api from "@/services/axios";

export const subscribeChannel = async (channelId: string) => {
    try {
        const response = await api.post(`/subscriptions/subscribe/${channelId}`);
        return response.data;
    } catch (error) {
        console.error("error", error);
        throw error;
    }
}

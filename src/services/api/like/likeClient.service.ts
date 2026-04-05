import api from "@/services/axios";


export const likeVideo = async (videoId: string) => {
    try {
        const response = await api.post(`/likes/like-video/${videoId}`);
        return response.data;
    } catch (error) {
        console.error("error", error);
        throw error;
    }
}

import api from "@/services/axios";

export const replyToComment = async (commentId: string, comment: string) => {
    try {
        const response = await api.post(`/comments/${commentId}/reply`, {
            comment,
        });
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const createComment = async (videoId: string, comment: string) => {
    try {
        const response = await api.post(`/videos/${videoId}/comment`, {
            comment,
        });
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

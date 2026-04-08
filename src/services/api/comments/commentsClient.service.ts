import api from "@/services/axios";

export const replyToComment = async (commentId: string) => {
    try {
        const response = await api.post(`/comments/${commentId}/reply`);
    } catch (e)
    {
        console.error(e);
        throw e;
    }
}

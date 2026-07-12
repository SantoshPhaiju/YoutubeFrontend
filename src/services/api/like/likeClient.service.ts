import api from "@/services/axios";

export const likeVideo = async (videoId: string, type: string) => {
  try {
    const response = await api.post(`/likes/like-video/${videoId}`, {
      type,
    });
    return response.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

export const likeComment = async (commentId: string, type: string) => {
    try {
        const response = await api.post(`/likes/like-comment/${commentId}`, {
            type,
        });
        return response.data;
    } catch (error) {
        console.error("error", error);
        throw error;
    }
}

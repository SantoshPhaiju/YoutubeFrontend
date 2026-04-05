import {useMutation} from "@tanstack/react-query";
import {likeVideo} from "@/services/api/like/likeClient.service";
import axios from "axios";
import {toast} from "sonner";


export const useVideoLikeMutation = () => {
    return useMutation({
        mutationKey: ["likeVideo"],
        mutationFn: async ({videoId, type}: {videoId: string, type: string}) => {
            return await likeVideo(videoId, type);
        },
        onError: (error) => {
            console.error(error);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Something went wrong")
            }
        }
    })
};

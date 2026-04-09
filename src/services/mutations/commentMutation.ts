import {useMutation} from "@tanstack/react-query";
import {createComment} from "@/services/api/comments/commentsClient.service";
import axios from "axios";
import {toast} from "sonner";


export const useCreateCommentMutation = () => {
    return useMutation({
        mutationKey: ["createComment"],
        mutationFn: async ({videoId, comment}: { videoId: string, comment: string }) => {
            return await createComment(videoId, comment);
        },
        onError: (error) => {
            console.error(error);
            if(axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Something went wrong")
            }
        }
    })
}

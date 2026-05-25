import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createComment, replyToComment} from "@/services/api/comments/commentsClient.service";
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

export const useReplyToCommentMutation = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["replyToComment"],
        mutationFn: async ({commentId, comment}: { commentId: string, comment: string }) => {
            return await replyToComment(commentId, comment);
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['commentReplyData', variables.commentId ] })
        },
        onError: (error) => {
            console.error(error);
            if(axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Something went wrong")
            }
        }
    })
}

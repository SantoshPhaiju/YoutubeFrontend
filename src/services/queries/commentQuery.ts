import {useQuery} from "@tanstack/react-query";
import {getCommentsReplies} from "@/services/api/videos/videoClient.service";

export function useCommentReplyData(commentId: string) {
    return useQuery({
        queryKey: ["commentReplyData", commentId],
        queryFn: async ({queryKey}) => {
            // console.log(queryKey);
            return await getCommentsReplies(queryKey[1] as string);
        },
        staleTime: 0,
    })
}

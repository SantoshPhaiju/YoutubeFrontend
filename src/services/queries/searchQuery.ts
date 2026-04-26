import {useQuery} from "@tanstack/react-query";
import {getCommentsReplies} from "@/services/api/videos/videoClient.service";
import {getSuggestions} from "@/services/api/search/searchClient.service";

export function useSearchSuggestions(query: string) {
    return useQuery({
        queryKey: ["searchSuggestions"],
        queryFn: async ({queryKey}) => {
            return await getSuggestions(queryKey[1] as string);
        },
        staleTime: 0,
    })
}

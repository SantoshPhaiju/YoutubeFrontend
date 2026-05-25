import {useMutation} from "@tanstack/react-query";
import {saveSuggestion} from "@/services/api/search/searchClient.service";

export function useSearchMutation() {
    return useMutation({
        mutationKey: ["search"],
        mutationFn: async (query: string) => {
            return await saveSuggestion(query);
        },
    });
}

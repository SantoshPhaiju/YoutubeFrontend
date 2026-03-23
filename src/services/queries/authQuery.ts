import {useQuery} from "@tanstack/react-query";
import {getLoggedInUserData} from "@/services/api/auth/auth.service";

export function useUserDataQuery() {
    return useQuery({
        queryKey: ["userData"],
        queryFn: getLoggedInUserData,
        staleTime: 0,
    })
}

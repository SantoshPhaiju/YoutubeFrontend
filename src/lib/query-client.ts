import {QueryClient} from "@tanstack/react-query";

export const queryclient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
            retry: 2,
            refetchOnWindowFocus: false,
        }
    }
})

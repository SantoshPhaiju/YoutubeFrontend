"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {ReactNode, useState} from "react";
import {queryclient} from "@/lib/query-client";

export function TanstackProvider({ children }: {
    children: ReactNode;
}) {
    // const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryclient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

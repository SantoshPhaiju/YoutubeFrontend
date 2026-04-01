import {useMutation} from "@tanstack/react-query";
import {subscribeChannel} from "@/services/api/channel/channelClient.service";
import axios from "axios";
import {toast} from "sonner";


export function useSubscriptionMutation() {
    return useMutation({
        mutationKey: ["subscribeChannel"],
        mutationFn: async (channelId: string) => {
            return await subscribeChannel(channelId);
        },
        onError: (error) => {
            console.error(error);
            if(axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Something went wrong")
            }
        }
    })
}

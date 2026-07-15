import { useQuery } from "@tanstack/react-query";
import { fetchSubscriptions } from "../api/subscription/subscriptionClient.service";

export function useSubscriptionQuery({
  enabled = false,
}: {
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["subscriptionsData"],
    queryFn: async () => {
      return await fetchSubscriptions();
    },
    enabled: enabled,
  });
}

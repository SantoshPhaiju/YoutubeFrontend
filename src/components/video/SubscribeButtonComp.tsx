'use client';

import {Button} from "@/components/ui/button";
import {useSubscriptionMutation} from "@/services/mutations/subscriptionMutation";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {cn} from "@/lib/utils";
import useAuthStore from "@/store/authStore";

interface ISubscribeButtonCompProps {
    isSubscribed: boolean;
    channelId: string;
    setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>;
    setSubscriberCount: React.Dispatch<React.SetStateAction<number>>;
    subscriberCount: number;
}

const SubscribeButtonComp = ({
                                 isSubscribed,
                                 channelId,
                                 setIsSubscribed,
                                 setSubscriberCount,
                                 subscriberCount,
                             }: ISubscribeButtonCompProps) => {

    const subscribeChannelMutation = useSubscriptionMutation();
    const [loading, setLoading] = useState<boolean>(false);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    const handleSubscribe = async () => {
        if (!isLoggedIn) {
            toast.error("Please sign in to subscribe to channels.");
            return;
        }
        setLoading(true);
        try {
            const response = await subscribeChannelMutation.mutateAsync(channelId);

            if (response.statusCode === 200) {
                setIsSubscribed(!isSubscribed);
                if (response.data !== null) {
                    setSubscriberCount(subscriberCount + 1);
                } else {
                    setSubscriberCount(subscriberCount - 1);
                }
                toast.success(response.message);
            } else {
                toast.error("Failed to subscribe to channel");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to subscribe to channel");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Button
                onClick={handleSubscribe}
                variant={!isSubscribed ? "default" : "outline"}
                className={cn(`rounded-full font-roboto font-medium`, {
                    "cursor-not-allowed": loading,
                    "cursor-pointer": !loading,
                })}
                disabled={loading}
            >
                {loading
                    ? isSubscribed
                        ? "Unsubscribing..."
                        : "Subscribing..."
                    : isSubscribed
                        ? "Unsubscribe"
                        : "Subscribe"
                }
            </Button>
        </div>
    );
};

export default SubscribeButtonComp;

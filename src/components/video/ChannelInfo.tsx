'use client';

import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import SubscribeButtonComp from "@/components/video/SubscribeButtonComp";
import {useState} from "react";

const ChannelInfo = ({
                         isOwner,
                         videoOwner,
                     }: {
    isOwner: boolean;
    videoOwner: any;
}) => {
    const [subscriberCount, setSubscriberCount] = useState(videoOwner?.subscribersCount || 0);
    const [isSubscribed, setIsSubscribed] = useState(videoOwner?.isSubscribed || false);
    return (
        <>
            <div className="flex gap-2">
                <div className="w-10 h-10 z-0">
                    <Link href={videoOwner?.username}>

                        <Avatar className="">
                            <AvatarImage
                                src={videoOwner.avatar || `https://github.com/shadcn.png`}
                                alt="@shadcn"
                                className="rounded-[50%] z-0"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </Link>
                </div>
                <div className="flex flex-col">
                    <div className="text-lg font-semibold leading-tight font-roboto">
                        {videoOwner.fullname}
                    </div>
                    <div className="text-[12px] font-medium text-gray-600">
                        {subscriberCount} subscribers
                    </div>
                </div>
            </div>
            {!isOwner && (
                <SubscribeButtonComp
                    subscriberCount={subscriberCount}
                    setIsSubscribed={setIsSubscribed}
                    setSubscriberCount={setSubscriberCount}
                    channelId={videoOwner._id}
                    isSubscribed={isSubscribed}
                />
            )}
        </>
    );
};

export default ChannelInfo;

'use client';

import {BiDislike, BiLike, BiSolidDislike, BiSolidLike} from "react-icons/bi";
import {formatViews} from "@/utils/formatVideoView";
import {useState} from "react";
import {useVideoLikeMutation} from "@/services/mutations/likeMutation";
import {cn} from "@/lib/utils";
import useAuthStore from "@/store/authStore";
import {toast} from "sonner";

const LikeComponent = ({
                           likeCount,
                           isLiked,
                           videoId,
                           isDisliked,
                       }: {
    likeCount: number;
    isLiked: boolean;
    videoId: string;
    isDisliked: boolean;
}) => {
    const [isLikedClient, setIsLikedClient] = useState(isLiked);
    const [isDislikedClient, setIsDislikedClient] = useState(isDisliked);
    const [likeCountClient, setLikeCountClient] = useState(likeCount);
    const {mutateAsync} = useVideoLikeMutation();
    const [loading, setLoading] = useState(false);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    const handleLike = async (type: string) => {
        if (!isLoggedIn) {
            toast.error("Please sign in to like videos.");
            return;
        }
        setLoading(true);
        if (type === 'like') {
            if (isLikedClient) {
                // Undo like
                setIsLikedClient(!isLikedClient);
                setLikeCountClient(likeCountClient - 1);
            } else {
                // New like or switch from dislike
                setIsLikedClient(!isLikedClient);
                setLikeCountClient(likeCountClient + 1);

                if (isDislikedClient) {
                    setIsDislikedClient(false);
                }
            }
        } else {
            if (isDislikedClient) {
                // Undo dislike
                setIsDislikedClient(false);
            } else {
                // New dislike or switch from like
                setIsDislikedClient(true);

                if (isLikedClient) {
                    setIsLikedClient(false);
                    setLikeCountClient(likeCountClient - 1);
                }
            }
        }

        const likeResponse = await mutateAsync({videoId, type});
        if (likeResponse.statusCode === 200) {
            setLikeCountClient(likeResponse.data.likeCount);
        }
        setLoading(false);
    }


    return (
        <>
            <div className="flex justify-between items-center rounded-full bg-gray-100">
                <button
                    onClick={() => handleLike("like")}
                    disabled={loading}
                    className={cn(`flex justify-center border-r border-border items-center rounded-l-full gap-1 md:gap-2 p-1.5 px-3 md:p-2 md:px-4 hover:bg-gray-200`, {
                        'cursor-not-allowed': loading,
                        'cursor-pointer': !loading,
                    })}>
                    {!isLikedClient ? (
                            <BiLike className={"text-[16px] md:text-[20px]"}/>
                        )
                        : (
                            <BiSolidLike className={"text-[16px] md:text-[20px]"}/>
                        )
                    }

                    <p className="font-sans font-semibold text-[12px] md:text-sm">{
                        formatViews(likeCountClient)
                    }</p>
                </button>
                <button
                    disabled={loading}
                    onClick={() => handleLike("dislike")}
                     className={cn(`p-1.5 px-3 md:p-2 md:px-4 rounded-r-full hover:bg-gray-200`, {
                         'cursor-not-allowed': loading,
                         'cursor-pointer': !loading,
                     })}>
                    {!isDislikedClient ? (<BiDislike className={"text-[16px] md:text-[20px]"}/>)
                        : (
                            <BiSolidDislike className={"text-[16px] md:text-[20px]"}/>
                        )
                    }
                </button>
            </div>
        </>
    );
};

export default LikeComponent;

'use client';

import {BiDislike, BiLike, BiSolidLike} from "react-icons/bi";
import {formatViews} from "@/utils/formatVideoView";
import {useState} from "react";
import {useVideoLikeMutation} from "@/services/mutations/likeMutation";

const LikeComponent = ({
                           likeCount,
                           isLiked,
                           videoId
                       }: {
    likeCount: number;
    isLiked: boolean;
    videoId: string;
}) => {
    const [isLikedClient, setIsLikedClient] = useState(isLiked);
    const [likeCountClient, setLikeCountClient] = useState(likeCount);
    const {mutateAsync} = useVideoLikeMutation();

    const handleLike = async () => {
        setIsLikedClient(!isLikedClient);
        if (isLikedClient) {
            setLikeCountClient(likeCountClient - 1);
        } else {
            setLikeCountClient(likeCountClient + 1);
        }
        const likeResponse = await mutateAsync(videoId);
        if (likeResponse.statusCode === 200) {
            setLikeCountClient(likeResponse.data.likeCount);
        }
    }


    return (
        <>
            <div className="flex justify-between items-center rounded-full bg-gray-100">
                <div
                    onClick={handleLike}
                    className="flex justify-center border-r border-border items-center rounded-l-full gap-1 md:gap-2 p-1.5 px-3 md:p-2 md:px-4 hover:bg-gray-200">
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
                </div>
                <div className="p-1.5 px-3 md:p-2 md:px-4 rounded-r-full hover:bg-gray-200">
                    <BiDislike className={"text-[16px] md:text-[20px]"}/>
                </div>
            </div>
        </>
    );
};

export default LikeComponent;

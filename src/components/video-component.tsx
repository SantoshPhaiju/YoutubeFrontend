import Image from "next/image";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IVideoComponentProps } from "@/@types/IVideoComponentProps.types";
import { timeAgo } from "@/utils/timeAgo";
import {formatDuration} from "@/utils/formatDuration";

const VideoComponent = ({
                            thumbnail,
                            userAvatar,
                            videoTitle,
                            videoViews,
                            videoDuration,
                            videoOwnerName,
                            videoPublishedDate,
                        }: IVideoComponentProps) => {
    return (
        <div className="w-full cursor-pointer">

            {/* Thumbnail */}
            <Link href="/watch?v=123">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                    <Image
                        src={thumbnail || "/assets/thumb.jpg"}
                        alt="Video thumbnail"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Duration */}
                    {videoDuration && (
                        <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-1.5 py-0.5 rounded">
                            {formatDuration(videoDuration)}
                        </div>
                    )}
                </div>
            </Link>

            {/* Details */}
            <div className="flex gap-3 mt-3">

                {/* Avatar */}
                <Avatar className="h-9 w-9">
                    <AvatarImage src={userAvatar || "https://github.com/shadcn.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                {/* Text Content */}
                <div className="flex flex-col flex-1">

                    {/* Title */}
                    <h3 className="text-sm font-medium leading-snug line-clamp-2">
                        {videoTitle ||
                            "How to Make Money Using Google Maps in 2025 ($100 - $200 PER DAY)"}
                    </h3>

                    {/* Channel */}
                    <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                        <span>{videoOwnerName || "Santosh Phaiju"}</span>
                        <MdVerified className="text-gray-500 text-sm" />
                    </div>

                    {/* Views + Date */}
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>{videoViews || 0} views</span>
                        <span>•</span>
                        <span>{timeAgo(videoPublishedDate)}</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default VideoComponent;

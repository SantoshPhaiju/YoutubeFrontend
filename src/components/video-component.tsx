"use client";

import { formatDuration } from "@/utils/formatDuration";
import { formatViews } from "@/utils/formatVideoView";
import { timeAgo } from "@/utils/timeAgo";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdVerified } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface IVideoComponentProps {
  videoId: string;
  thumbnail: string;
  userAvatar: string;
  videoTitle: string;
  videoViews: number;
  videoDuration: number;
  videoOwnerName: string;
  videoPublishedDate: string;
  username: string;
}

const VideoComponent = ({
  videoId,
  thumbnail = "/assets/thumb.jpg",
  userAvatar,
  videoTitle,
  videoViews,
  videoDuration,
  videoOwnerName,
  videoPublishedDate,
  username,
}: IVideoComponentProps) => {
  console.log("thumbnail url: ", thumbnail);
  const [thumbnailSrc, setThumbnailSrc] = useState(
    thumbnail || "/assets/thumb.jpg",
  );
  return (
    <div className="w-full cursor-pointer">
      {/* Thumbnail */}
      <Link href={`/watch?v=${videoId}`}>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
          <Image
            src={thumbnailSrc || "/assets/thumb.jpg"}
            alt="Video thumbnail"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setThumbnailSrc("/assets/thumb.jpg")}
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
        <Link href={username}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={userAvatar || "https://github.com/shadcn.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>

        {/* Text Content */}
        <div className="flex flex-col flex-1">
          {/* Title */}
          <h3 className="text-sm text-black font-medium leading-snug line-clamp-2">
            {videoTitle ||
              "How to Make Money Using Google Maps in 2025 ($100 - $200 PER DAY)"}
          </h3>

          {/* Channel */}
          <div className="flex items-center gap-1 font-normal text-xs text-gray-800 mt-0.5">
            <span>{videoOwnerName || "Santosh Phaiju"}</span>
            <MdVerified className="text-gray-800 text-sm" />
          </div>

          {/* Views + Date */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>{formatViews(videoViews) || 0} views</span>
            <span>•</span>
            <span>{timeAgo(videoPublishedDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;

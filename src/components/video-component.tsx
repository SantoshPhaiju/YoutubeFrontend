import Image from "next/image";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {IVideoComponentProps} from "@/@types/IVideoComponentProps.types";
import {timeAgo} from "@/utils/timeAgo";

const VideoComponent = (
    {
      thumbnail,
      userAvatar,
      videoTitle,
      videoViews,
      videoDuration,
      videoOwnerName,
      videoPublishedDate,
    }: IVideoComponentProps
) => {
  return (
    <div className="w-full h-auto cursor-pointer">
      <div className="thumbnail">
        <Link href="/watch?v=123">
          <Image
            src={thumbnail || "/assets/thumb.jpg"}
            height={200}
            width={300}
            className="h-auto max-h-[320px] min-h-[220px] w-full rounded-md object-cover"
            alt="VideoComponent"
          />
        </Link>
      </div>

      <div className="details py-1 pt-2 flex gap-2">
        <div>
          <Avatar>
            <AvatarImage src={userAvatar || `https://github.com/shadcn.png`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-1 px-1">
          <div className="title text-md text-black">
            {videoTitle || `How to Make Money Using Google Maps in 2025 ($100 - $200 PER DAY)
              something`}
          </div>
          <div className="flex flex-col mt-[1px]">
            <div className="channelName text-sm text-gray-600 flex justify-start items-center gap-1">
            {videoOwnerName || "Santosh Phaiju"} <MdVerified />
            </div>
            <div className="flex justify-start items-center gap-2 text-gray-600 text-sm">
              <div className="views">{videoViews || 0} views</div>
              <div className="dot h-1 w-1 bg-black rounded-full"></div>

              <div className="publishedDate">{timeAgo(videoPublishedDate)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;

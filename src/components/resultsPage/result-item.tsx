import { formatViews } from "@/utils/formatVideoView";
import { timeAgo } from "@/utils/timeAgo";
import Image from "next/image";
import Link from "next/link";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ResultItem = ({ resultData }: { resultData: any }) => {
  return (
    <Link href={`/watch?v=${resultData?._id}`} className="w-full">
      <div className="searchResultItem cursor-pointer w-full h-auto flex gap-4 justify-between">
        <div className="w-[40%] h-auto aspect-video rounded-xl">
          <Image
            src={resultData?.thumbnail || "/assets/thumb.jpg"}
            alt="thumbnail"
            width={400}
            height={225}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="vidMetaData h-auto w-[60%] py-2 flex flex-col gap-2">
          <div className="flex flex-col gap-0">
            <div className="title font-medium text-[12px] md:text-[14px] lg:text-[16px] leading-tight line-clamp-2 flex justify-between items-center">
              <p>{resultData?.title || "Video Title here..."}</p>
              <div>
                <PiDotsThreeOutlineFill />
              </div>
            </div>
            <div className="stats flex gap-1 items-center text-[10px] md:text-[12px] text-gray-600 py-1">
              <div>
                {formatViews(resultData?.viewCount || 0)}
                &nbsp;views
              </div>
              <div className="h-0.5 w-0.5 bg-black rounded-full"></div>
              <div>{timeAgo(resultData?.createdAt)}</div>
            </div>
          </div>

          <div className="channelInfo flex gap-2 items-center py-1">
            <Avatar className="w-6 h-6">
              <AvatarImage src={resultData?.owner?.avatar} />
              <AvatarFallback>
                {resultData?.owner?.fullname || "CN"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-normal text-[12px] md:text-[14px]">
                {resultData?.owner?.fullname || "Channel Name"}
              </p>
            </div>
          </div>
          <div className="videoDesc ">
            <p className="text-[10px] line-clamp-2 capitalize md:text-[12px] text-gray-600">
              {resultData?.description.slice(0, 200)}
              {resultData?.description.length > 200 ? "..." : ""}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResultItem;

import Image from "next/image";
import Link from "next/link";
import { GoKebabHorizontal } from "react-icons/go";
import { cn } from "@/lib/utils";
import {timeAgo} from "@/utils/timeAgo";

const SmallVideoComponent = (
    {
        video
    }: { video: any }
) => {
    return (
        <div className={cn(`video w-full cursor-pointer`)}>
            <div className="thumbnail">
                <Link href={`/watch?v=${video?._id}`}>
                    <Image
                        src={video?.thumbnail || `/assets/thumb.jpg`}
                        height={200}
                        width={300}
                        className={cn(`aspect-video rounded-md object-cover w-full`)}
                        alt="VideoComponent"
                    />
                </Link>
            </div>

            <div className="details py-1 pt-2.5 flex">
                <div
                    className="flex flex-col gap-0.5 px-1 w-full">
                    <div
                        className="title text-sm text-black font-medium line-clamp-2 w-[98%]">
                        {video?.title || "Video Title"}
                    </div>
                    <div
                        className="flex flex-col w-full">
                        {/*<div className="channelName text-sm text-gray-600 flex justify-start items-center gap-1">*/}
                        {/*    Santosh Phaiju <MdVerified />*/}
                        {/*</div>*/}
                        <div
                            className="flex justify-start items-center gap-2 text-gray-600 text-xs">
                            <div
                                className="views">{video?.viewCount || 0} views
                            </div>
                            <div
                                className="dot h-1 w-1 bg-black rounded-full"></div>
                            <div className="publishedDate">
                                {timeAgo(video?.createdAt || new Date())}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="threeDot h-full">
                    <GoKebabHorizontal
                        className={"rotate-90 text-xl"}/>
                </div>
            </div>
        </div>
    );
};

export default SmallVideoComponent;

import Image from "next/image";
import Link from "next/link";
import { GoKebabHorizontal } from "react-icons/go";
import {cn} from "@/lib/utils";

const SmallVideoComponent = (
    {
        videoSize = "small",
    }: { videoSize?: "small" | "medium" | "large" }
) => {
    return (
        <div className={cn(`w-[250px] h-auto cursor-pointer`, {
            "min-h-[140px] w-[250px]": videoSize === "small",
            "min-h-[180px] w-[280px]": videoSize === "medium",
            "min-h-[250px] w-[320px]": videoSize === "large",
        })}>
            <div className="thumbnail">
                <Link href="/watch?v=123">
                    <Image
                        src={"/assets/thumb.jpg"}
                        height={200}
                        width={300}
                        className={cn(`h-auto max-h-[200px] min-h-[140px] w-full rounded-md object-cover`)}
                        alt="VideoComponent"
                    />
                </Link>
            </div>

            <div className="details py-1 pt-2 flex">
                <div className="flex flex-col gap-1 px-1">
                    <div className="title text-sm text-black line-clamp-2">
                        How to Make Money Using Google Maps in 2025 ($100 - $200 PER DAY)
                        something
                    </div>
                    <div className="flex flex-col mt-[1px]">
                        {/*<div className="channelName text-sm text-gray-600 flex justify-start items-center gap-1">*/}
                        {/*    Santosh Phaiju <MdVerified />*/}
                        {/*</div>*/}
                        <div className="flex justify-start items-center gap-2 text-gray-600 text-sm">
                            <div className="views">99k views</div>
                            <div className="dot h-1 w-1 bg-black rounded-full"></div>

                            <div className="publishedDate">3 days ago</div>
                        </div>
                    </div>
                </div>
                <div className="threeDot h-full">
                    <GoKebabHorizontal className={"rotate-90 text-xl"} />
                </div>
            </div>
        </div>
    );
};

export default SmallVideoComponent;

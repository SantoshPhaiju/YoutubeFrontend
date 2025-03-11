import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MdVerified } from "react-icons/md";

const VideoComponent = () => {
  return (
    <div className="w-full h-auto cursor-pointer">
      <div className="thumbnail">
        <Image
          src={"/assets/thumb.jpg"}
          height={200}
          width={300}
          className="h-[200px] w-full rounded-md object-cover"
          alt="VideoComponent"
        />
      </div>

      <div className="details py-1 pt-2 flex gap-2">
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-1 px-1">
          <div className="title text-md text-black">
            How to Make Money Using Google Maps in 2025 ($100 - $200 PER DAY)
            something
          </div>
          <div className="flex flex-col mt-[1px]">
            <div className="channelName text-sm text-gray-600 flex justify-start items-center gap-1">
              Santosh Phaiju <MdVerified />

            </div>
            <div className="flex justify-start items-center gap-2 text-gray-600 text-sm">
              <div className="views">99k views</div>
              <div className="dot h-1 w-1 bg-black rounded-full"></div>

              <div className="publishedDate">3 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;

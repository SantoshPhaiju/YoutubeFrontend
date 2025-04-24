import Image from "next/image";
import { MdVerified } from "react-icons/md";

const SemiVideo = () => {
  return (
    <div className="w-[100%] h-[120px] xl:h-[100px] cursor-pointer flex justify-start xl:justify-between items-center gap-2 mt-3">
      <Image
        src={"/assets/thumb.jpg"}
        height={200}
        width={300}
        className="h-full w-[200px] xl:w-[44%] rounded-md object-cover"
        alt="VideoComponent"
      />

      <div className="details xl:w-[56%] h-full flex gap-2">
        <div className="flex flex-col gap-1 px-1">
          <div className="title text-[14px] text-black font-medium leading-normal">
           {" How to Make Money Using Google Maps in 2025 ($100 - $200 PER DAY) something".substring(0, 40) + "..."}
          </div>
          <div className="flex flex-col ">
            <div className="channelName text-[13px] text-gray-600 flex justify-start items-center gap-1">
              Santosh Phaiju <MdVerified />
            </div>
            <div className="flex justify-start items-center gap-2 text-gray-600 text-[13px]">
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

export default SemiVideo;

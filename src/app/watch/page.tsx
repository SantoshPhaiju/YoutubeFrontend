import CommentComponent from "@/components/video/comment/comment-component";
import SeeMoreComponent from "@/components/video/seemore/see-more-component";
import SemiNav from "@/components/semi-nav";
import SemiVideo from "@/components/semiVideoComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ClientVideoPageLayout from "@/components/video/client-vidoepage-layout.client";
import Image from "next/image";
import { BiDislike, BiLike } from "react-icons/bi";
import { FiBookmark } from "react-icons/fi";
import { PiShareFatLight } from "react-icons/pi";
import {getVideoById} from "@/services/api/videos/video.service";
import {timeAgo} from "@/utils/timeAgo";
import {formatDate} from "@/utils/formatDate";

interface WatchPageProps {
  searchParams: {
    v?: string;
  };
}

const Page = async ({ searchParams }: WatchPageProps) => {
  const videoId = (await searchParams).v;

  if (!videoId) {
    return <p>Invalid video ID</p>;
  }

  const video = await getVideoById({ id: videoId });
  const videoOwner = Array.isArray(video.owner) ? video.owner[0]: video.owner;

  const desc =
    "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.";
  const videoDescription = desc.repeat(10);

  return (
    <>
      <ClientVideoPageLayout>
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 pb-2 z-0">
          {/* <Videopage /> */}
          <div className="w-full px-2 mx-auto h-auto cursor-pointer flex flex-col xl:flex-row xl:justify-center xl:items-start gap-6">
            <div className="leftContainer w-full flex flex-col gap-3 xl:w-[70%] ">
              <div className="videoPlayer w-full rounded-xl overflow-hidden aspect-video">
                {/*<Image*/}
                {/*  src={"/assets/thumb.jpg"}*/}
                {/*  height={200}*/}
                {/*  width={300}*/}
                {/*  className="aspect-video w-full object-cover"*/}
                {/*  alt="VideoComponent"*/}
                {/*/>*/}
                <video
                    src={video.videoFile}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                    loop
                />
              </div>
              <div className="videoDetails flex flex-col gap-3">
                <div className="text-lg md:text-xl font-bold leading-tight">
                  {video?.title || "Video Title here..."}
                </div>
                <div className="flex gap-4 flex-col lg:flex-row justify-between">
                  <div className="channel flex gap-5 items-center justify-between xl:justify-start">
                    <div className="flex gap-2">
                      <div className="w-10 h-10 z-0">
                        <Avatar className="">
                          <AvatarImage
                              src={videoOwner.avatar || `https://github.com/shadcn.png`}
                            alt="@shadcn"
                            className="rounded-[50%] z-0"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-lg font-semibold leading-tight font-roboto">
                          {videoOwner.fullname}
                        </div>
                        <div className="text-[12px] font-medium text-gray-600">
                          {videoOwner.subscribersCount} subscribers
                        </div>
                      </div>
                    </div>
                    {!videoOwner.isSubscribed ? <Button
                        variant="default"
                        className="rounded-full font-roboto font-medium"
                    >
                      Subscribe
                    </Button>: (
                        <Button
                            variant="ghost"
                            className="rounded-full font-roboto font-medium"
                        >
                          Subscribed
                        </Button>
                    )}
                  </div>
                  <div className="flex justify-start xl:justify-end gap-1 md:gap-2 flex-wrap items-center ">
                    <div className="flex justify-between items-center rounded-full bg-gray-100">
                      <div className="flex justify-center border-r items-center rounded-l-full gap-1 md:gap-2 p-1.5 px-3 md:p-2 md:px-4 hover:bg-gray-200">
                        <BiLike className={"text-[16px] md:text-[20px]"} />
                        <p className="font-sans font-semibold text-[12px] md:text-sm">{
                          video.likeCount
                        }</p>
                      </div>
                      <div className="p-1.5 px-3 md:p-2 md:px-4 rounded-r-full hover:bg-gray-200">
                        <BiDislike className={"text-[16px] md:text-[20px]"} />
                      </div>
                    </div>
                    <div className="flex justify-center bg-gray-100 items-center rounded-full gap-1 md:gap-2 p-1.5 px-3 md:p-2 md:px-4 hover:bg-gray-200">
                      <PiShareFatLight className={"text-[16px] md:text-[20px]"} />
                      <p className="font-sans font-semibold text-[12px] md:text-sm">Share</p>
                    </div>
                    <div className="flex justify-center bg-gray-100 items-center rounded-full gap-1 md:gap-2 p-1.5 px-3 md:p-2 md:px-4 hover:bg-gray-200">
                      <FiBookmark className={"text-[16px] md:text-[20px]"} />
                      <p className="font-sans font-semibold text-[12px] md:text-sm">Save</p>
                    </div>
                    <div className="rounded-full h-auto py-3.5 px-2 md:py-[18px] md:px-3 bg-gray-100 hover:bg-gray-200 flex justify-center gap-[2px] items-center">
                      <div className="bg-gray-700 h-0.75 w-0.75 md:h-1 md:w-1 rounded-full"></div>
                      <div className="bg-gray-700 h-0.75 w-0.75 md:h-1 md:w-1 rounded-full"></div>
                      <div className="bg-gray-700 h-0.75 w-0.75 md:h-1 md:w-1 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="descriptionSection flex flex-col gap-2 py-[12px] px-[12px] h-auto w-full bg-gray-100 rounded-xl">
                <div className="flex justify-start items-center gap-2 font-semibold text-[15px] font-roboto">
                  <div>{
                    video.viewCount
                  } views</div>
                  <div>{
                    formatDate(video.createdAt)
                  }</div>
                </div>
                <SeeMoreComponent videoDescription={video.description} />
              </div>
              <CommentComponent />
            </div>
            <div className="rightContainer w-full xl:block xl:w-[30%] ">
              <SemiNav />
              <SemiVideo />
              <SemiVideo />
              <SemiVideo />
              <SemiVideo />
            </div>
          </div>
        </div>
      </ClientVideoPageLayout>
    </>
  );
};

export default Page;

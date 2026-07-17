import SemiNav from "@/components/semi-nav";
import SemiVideo from "@/components/semiVideoComponent";
import ChannelInfo from "@/components/video/ChannelInfo";
import ClientVideoPageLayout from "@/components/video/client-vidoepage-layout.client";
import CommentsSection from "@/components/video/comment/CommentsSection";
import LikeComponent from "@/components/video/LikeComponent";
import SeeMoreComponent from "@/components/video/seemore/see-more-component";
import VideoView from "@/components/video/videoView";
import {
  getVideoByIdCached,
  getVideoComments,
} from "@/services/api/videos/video.service";
import { formatDate } from "@/utils/formatDate";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { FiBookmark } from "react-icons/fi";
import { PiShareFatLight } from "react-icons/pi";

interface WatchPageProps {
  searchParams: {
    v?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: WatchPageProps): Promise<Metadata> {
  const cookieStore = await cookies();
  const user = cookieStore.get("user");
  const userData = user ? JSON.parse(user.value) : null;
  const videoId = (await searchParams).v;

  if (!videoId) return {};

  const video = await getVideoByIdCached(videoId, userData?._id);
  const videoOwner = Array.isArray(video.owner) ? video.owner[0] : video.owner;

  return {
    title: `(23) ${video.title} | ${videoOwner?.fullname}`,
    description: video.description,
  };
}

const Page = async ({ searchParams }: WatchPageProps) => {
  const videoId = (await searchParams).v;

  const cookieStore = await cookies();
  const userData = JSON.parse(cookieStore.get("user")?.value || "{}");

  if (!videoId) {
    return <p>Invalid video ID</p>;
  }

  // const video = await getVideoById({ id: videoId });
  const video = await (async () => {
    try {
      return await getVideoByIdCached(videoId, userData?._id);
    } catch (error) {
      notFound();
    }
  })();

  const comments = await (async () => {
    try {
      return await getVideoComments({ videoId });
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  })();

  const videoOwner = Array.isArray(video.owner) ? video.owner[0] : video.owner;
  const isOwner = userData?.username === videoOwner.username;

  // const desc =
  //     "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.";
  // const videoDescription = desc.repeat(10);

  return (
    <>
      <ClientVideoPageLayout>
        <div className="px-2 pb-2 -mt-4 z-0">
          <div className="w-full px-2 mx-auto h-auto cursor-pointer flex flex-col xl:flex-row xl:justify-center xl:items-start gap-4">
            <div className="leftContainer w-full flex flex-col gap-2 xl:w-[69%] 2xl:w-[72%]">
              <div className="videoPlayer w-full rounded-xl overflow-hidden aspect-video">
                {/*<Image*/}
                {/*  src={"/assets/thumb.jpg"}*/}
                {/*  height={200}*/}
                {/*  width={300}*/}
                {/*  className="aspect-video w-full object-cover"*/}
                {/*  alt="VideoComponent"*/}
                {/*/>*/}
                <video
                  preload="metadata"
                  src={video.videoFile}
                  controls
                  autoPlay
                  className="w-full h-full object-contain bg-black"
                  loop
                />
              </div>
              <div className="videoDetails flex flex-col gap-3">
                <div className="text-lg md:text-xl font-bold leading-tight">
                  {video?.title || "Video Title here..."}
                </div>
                <div className="flex gap-4 flex-col lg:flex-row justify-between">
                  <div className="channel flex gap-5 items-center justify-between xl:justify-start">
                    <ChannelInfo videoOwner={videoOwner} isOwner={isOwner} />
                  </div>
                  <div className="flex justify-start xl:justify-end gap-1 md:gap-2 flex-wrap items-center ">
                    <LikeComponent
                      isDisliked={video?.isDisliked}
                      isLiked={video?.isLiked || false}
                      likeCount={video?.likeCount}
                      videoId={video?._id}
                    />
                    <div className="flex justify-center bg-gray-100 items-center rounded-full gap-1 md:gap-2 p-1.5 px-3 md:p-2 md:px-4 hover:bg-gray-200">
                      <PiShareFatLight
                        className={"text-[16px] md:text-[20px]"}
                      />
                      <p className="font-sans font-semibold text-[12px] md:text-sm">
                        Share
                      </p>
                    </div>
                    <div className="flex justify-center bg-gray-100 items-center rounded-full gap-1 md:gap-2 p-1.5 px-3 md:p-2 md:px-4 hover:bg-gray-200">
                      <FiBookmark className={"text-[16px] md:text-[20px]"} />
                      <p className="font-sans font-semibold text-[12px] md:text-sm">
                        Save
                      </p>
                    </div>
                    <div className="rounded-full h-auto py-3.5 px-2 md:py-4.5 md:px-3 bg-gray-100 hover:bg-gray-200 flex justify-center gap-0.5 items-center">
                      <div className="bg-gray-700 h-0.75 w-0.75 md:h-1 md:w-1 rounded-full"></div>
                      <div className="bg-gray-700 h-0.75 w-0.75 md:h-1 md:w-1 rounded-full"></div>
                      <div className="bg-gray-700 h-0.75 w-0.75 md:h-1 md:w-1 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="descriptionSection flex flex-col gap-2 py-3 px-3 h-auto w-full bg-gray-100 rounded-xl">
                <div className="flex justify-start items-center gap-2 font-semibold text-[15px] font-roboto">
                  <VideoView
                    videoDuration={video.duration}
                    videoId={video._id}
                    viewCount={video.viewCount}
                  />
                  <div>{formatDate(video.createdAt)}</div>
                </div>
                <SeeMoreComponent videoDescription={video.description} />
              </div>
              <CommentsSection
                videoOwnerId={videoOwner._id}
                comments={comments}
                userData={userData}
                videoId={video._id}
              />
            </div>
            <div className="rightContainer w-full xl:block xl:w-[31%] 2xl:w-[28%]">
              <SemiNav />
              <div className="flex -mt-1 flex-col gap-3 items-start justify-center">
                <SemiVideo />
                <SemiVideo />
                <SemiVideo />
                <SemiVideo />
              </div>
            </div>
          </div>
        </div>
      </ClientVideoPageLayout>
    </>
  );
};

export default Page;

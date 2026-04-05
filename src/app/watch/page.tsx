import CommentComponent from "@/components/video/comment/comment-component";
import SeeMoreComponent from "@/components/video/seemore/see-more-component";
import SemiNav from "@/components/semi-nav";
import SemiVideo from "@/components/semiVideoComponent";
import ClientVideoPageLayout from "@/components/video/client-vidoepage-layout.client";
import {BiDislike, BiLike} from "react-icons/bi";
import {FiBookmark} from "react-icons/fi";
import {PiShareFatLight} from "react-icons/pi";
import {getVideoById} from "@/services/api/videos/video.service";
import {formatDate} from "@/utils/formatDate";
import {notFound} from "next/navigation";
import {cookies} from "next/headers";
import {formatViews} from "@/utils/formatVideoView";
import ChannelInfo from "@/components/video/ChannelInfo";
import VideoView from "@/components/video/videoView";
import LikeComponent from "@/components/video/LikeComponent";

interface WatchPageProps {
    searchParams: {
        v?: string;
    };
}

const Page = async ({searchParams}: WatchPageProps) => {
    const videoId = (await searchParams).v;

    const cookieStore = await cookies();
    const userData = JSON.parse(cookieStore.get("user")?.value || "{}");

    if (!videoId) {
        return <p>Invalid video ID</p>;
    }

    // const video = await getVideoById({ id: videoId });
    const video = await (async () => {
        try {
            return await getVideoById({id: videoId});
        } catch (error) {
            notFound();
        }
    })();

    const videoOwner = Array.isArray(video.owner) ? video.owner[0] : video.owner;
    const isOwner = userData?.username === videoOwner.username;

    const desc =
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.";
    const videoDescription = desc.repeat(10);

    return (
        <>
            <ClientVideoPageLayout>
                <div className="px-4 md:px-8 lg:px-12 xl:px-16 pb-2 z-0">
                    {/* <Videopage /> */}
                    <div
                        className="w-full px-2 mx-auto h-auto cursor-pointer flex flex-col xl:flex-row xl:justify-center xl:items-start gap-6">
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
                                        <ChannelInfo videoOwner={videoOwner} isOwner={isOwner}/>
                                    </div>
                                    <div
                                        className="flex justify-start xl:justify-end gap-1 md:gap-2 flex-wrap items-center ">
                                        <LikeComponent isLiked={video?.isLiked || false} likeCount={video?.likeCount} videoId={video?._id} />
                                        <div
                                            className="flex justify-center bg-gray-100 items-center rounded-full gap-1 md:gap-2 p-1.5 px-3 md:p-2 md:px-4 hover:bg-gray-200">
                                            <PiShareFatLight className={"text-[16px] md:text-[20px]"}/>
                                            <p className="font-sans font-semibold text-[12px] md:text-sm">Share</p>
                                        </div>
                                        <div
                                            className="flex justify-center bg-gray-100 items-center rounded-full gap-1 md:gap-2 p-1.5 px-3 md:p-2 md:px-4 hover:bg-gray-200">
                                            <FiBookmark className={"text-[16px] md:text-[20px]"}/>
                                            <p className="font-sans font-semibold text-[12px] md:text-sm">Save</p>
                                        </div>
                                        <div
                                            className="rounded-full h-auto py-3.5 px-2 md:py-[18px] md:px-3 bg-gray-100 hover:bg-gray-200 flex justify-center gap-[2px] items-center">
                                            <div className="bg-gray-700 h-0.75 w-0.75 md:h-1 md:w-1 rounded-full"></div>
                                            <div className="bg-gray-700 h-0.75 w-0.75 md:h-1 md:w-1 rounded-full"></div>
                                            <div className="bg-gray-700 h-0.75 w-0.75 md:h-1 md:w-1 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="descriptionSection flex flex-col gap-2 py-[12px] px-[12px] h-auto w-full bg-gray-100 rounded-xl">
                                <div
                                    className="flex justify-start items-center gap-2 font-semibold text-[15px] font-roboto">
                                    <VideoView videoDuration={video.duration} videoId={video._id} viewCount={video.viewCount}/>
                                    <div>{
                                        formatDate(video.createdAt)
                                    }</div>
                                </div>
                                <SeeMoreComponent videoDescription={video.description}/>
                            </div>
                            <CommentComponent userData={userData}/>
                        </div>
                        <div className="rightContainer w-full xl:block xl:w-[30%] ">
                            <SemiNav/>
                            <SemiVideo/>
                            <SemiVideo/>
                            <SemiVideo/>
                            <SemiVideo/>
                        </div>
                    </div>
                </div>
            </ClientVideoPageLayout>
        </>
    );
};

export default Page;

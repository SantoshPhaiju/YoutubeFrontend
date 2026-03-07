import {IVideo} from "@/@types/videos/videos.type";
import HomePageClient from "@/components/home-page.client";
import VideoComponent from "@/components/video-component";
import {getAllHomePageVideos} from "@/services/api/videos/video.service";

export default async function Home() {
    const videos: IVideo[] = await getAllHomePageVideos({});

    return (
        <div>
            <HomePageClient />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-6 px-4 pr-6">
                {videos?.map((video, index: number) => {
                    const videoOwner = Array.isArray(video.owner) ? video.owner[0] : video.owner;
                    return (
                        <div key={index} className="col-span-1">
                            <VideoComponent
                                videoId={video._id}
                                thumbnail={video.thumbnail}
                                videoTitle={video.title}
                                videoViews={video.viewCount}
                                videoDuration={video.duration}
                                videoOwnerName={videoOwner.fullname}
                                videoPublishedDate={video.createdAt}
                                userAvatar={videoOwner.avatar}
                            />
                        </div>
                    );
                })}
                {/*<div className="col-span-1">*/}
                {/*  <VideoComponent />*/}
                {/*</div>*/}
                {/*<div className="col-span-1">*/}
                {/*  <VideoComponent />*/}
                {/*</div>*/}
                {/*<div className="col-span-1">*/}
                {/*  <VideoComponent />*/}
                {/*</div>*/}
                {/*<div className="col-span-1">*/}
                {/*  <VideoComponent />*/}
                {/*</div>*/}
                {/*<div className="col-span-1">*/}
                {/*  <VideoComponent />*/}
                {/*</div>*/}
                {/*<div className="col-span-1">*/}
                {/*  <VideoComponent />*/}
                {/*</div>*/}
                {/*<div className="col-span-1">*/}
                {/*  <VideoComponent />*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

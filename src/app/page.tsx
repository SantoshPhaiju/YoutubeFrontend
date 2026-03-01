import HomePageClient from "@/components/home-page.client";
import VideoComponent from "@/components/video-component";
import {getAllHomePageVideos} from "@/services/auth/auth.service";

export default async function Home() {
  const videos = await getAllHomePageVideos({});
  console.log("myvideos", videos);
  return (
    <div>
      <HomePageClient />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-6 px-4 pr-6">
        {
          videos.map((video, index) => {
            return (
                <div key={index} className="col-span-1">
                  <VideoComponent
                      thumbnail={video.thumbnail}
                      videoTitle={video.title}
                      videoViews={video.viewCount}
                      videoDuration={video.duration * 60 * 60}
                      videoOwnerName={video.owner.fullName}
                      videoPublishedDate={video.createdAt}
                      userAvatar={video.owner.avatar}
                  />
                </div>
            )
          })
        }
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

import VideoComponent from "@/components/video-component";

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6 px-4 pr-6">
        <div className="col-span-1">
          <VideoComponent />
        </div>
        <div className="col-span-1">
          <VideoComponent />
        </div>
        <div className="col-span-1">
          <VideoComponent />
        </div>
        <div className="col-span-1">
          <VideoComponent />
        </div>
        <div className="col-span-1">
          <VideoComponent />
        </div>
        <div className="col-span-1">
          <VideoComponent />
        </div>
        <div className="col-span-1">
          <VideoComponent />
        </div>
      </div>
    </div>
  );
}

import ChannelPageClientLayout from "@/components/channel/channel-page-client-layout";
import Image from "next/image";

const Page = () => {
  return (
    <>
      {/* <HomePageClient /> */}
      <div className="border border-black">
        <ChannelPageClientLayout>
          <div className="flex flex-col gap-2 md:gap-6">
            {/* Channel cover image */}
            <div>
              <Image
                src={"/assets/thumb.jpg"}
                height={900}
                width={900}
                className="h-auto max-h-[180px] w-full object-cover"
                alt="Channel Cover"
              />
            </div>
            <div className="flex gap-4 items-start">
              <div className="left">
                <Image
                  src={"/assets/thumb.jpg"}
                  height={400}
                  width={400}
                  className="h-[180px] w-[180px] object-cover rounded-full"
                  alt="Channel Avatar"
                />
              </div>
              <div className="right">
                <h2>
                  Santosh Phaiju
                </h2>
                <div>
                  <span>
                    @santoshphaiju321
                  </span>
                  <span>.</span>
                  <span>103 subscribers</span>
                  <span>.</span>
                  <span>6 videos</span>
                </div>
                <div>
                  <span>
                    Channel description goes here. This is a brief introduction about the channel, its content, and what viewers can expect.
                  </span>
                  <span> </span>
                  <span>...more</span>
                </div>
              </div>
            </div>
            <div className="tabs flex gap-2 md:gap-4">
              <div className="tab active">Videos</div>
              <div className="tab">Shorts</div>
              <div className="tab">Playlists</div>
              <div className="tab">Community</div>
              <div className="tab">Channels</div>
              <div className="tab">About</div>
            </div>
          </div>
        </ChannelPageClientLayout>
      </div>
    </>
  );
};

export default Page;

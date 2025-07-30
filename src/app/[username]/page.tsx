import ChannelPageClientLayout from "@/components/channel/channel-page-client-layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const Page = () => {
  return (
    <>
      {/* <HomePageClient /> */}
      <div className="">
        <ChannelPageClientLayout>
          <div className="flex flex-col gap-2 md:gap-6">
            {/* Channel cover image */}
            <div>
              <Image
                src={"/assets/thumb.jpg"}
                height={900}
                width={900}
                className="h-auto max-h-[180px] w-full object-cover rounded-2xl"
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
              <div className="right flex flex-col gap-2">
                <h2 className="text-[40px] font-semibold text-black leading-none">
                  Santosh Phaiju
                </h2>
                <div className="flex gap-1">
                  <span className="font-medium text-black text-[14px]">
                    @santoshphaiju321
                  </span>
                  <span>.</span>
                  <span className="text-gray-700 text-[14px]">
                    103 subscribers
                  </span>
                  <span>.</span>
                  <span className="text-gray-700 text-[14px]">6 videos</span>
                </div>
                <div>
                  <span className="text-gray-600">
                    {"Channel description goes here. This is a brief introduction about the channel, its content, and what viewers can expect.".slice(
                      0,
                      100
                    )}
                  </span>
                  <span> </span>
                  <span className="text-black font-medium cursor-pointer">
                    ...more
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 text-[14px]">
                    Joined on January 1, 2020
                  </span>
                </div>
                <div>
                  <Button variant={"default"} className="rounded-full">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
            <div className="tabs flex gap-2 md:gap-4 min-h-[400px]">
              <Tabs defaultValue="home" className="w-full flex justify-start flex-col items-start">
                <TabsList className="flex gap-4 bg-transparent z-10">
                  <TabsTrigger
                    value="home"
                    className="data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black pb-2 text-sm font-medium transition-colors !shadow-none rounded-[0px]"
                  >
                    Home
                  </TabsTrigger>
                  <TabsTrigger
                    value="videos"
                    className="data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black pb-2 text-sm font-medium transition-colors !shadow-none rounded-[0px]"
                  >
                    Videos
                  </TabsTrigger>
                  <TabsTrigger
                    value="playlists"
                    className="text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black pb-2 text-sm font-medium transition-colors !shadow-none rounded-[0px]"
                  >
                    Playlists
                  </TabsTrigger>
                  <TabsTrigger
                    value="about"
                    className="text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black pb-2 text-sm font-medium transition-colors !shadow-none rounded-[0px]"
                  >
                    About
                  </TabsTrigger>
                </TabsList>
                <div className="w-[100%] border -mt-[3px] z-0"></div>

                <TabsContent value="home" className="mt-4">
                  <p>All home page content will be here.</p>
                </TabsContent>
                <TabsContent value="videos" className="mt-4">
                  <p>All uploaded videos will appear here.</p>
                </TabsContent>
                <TabsContent value="playlists" className="mt-4">
                  <p>Your playlists will appear here.</p>
                </TabsContent>
                <TabsContent value="about" className="mt-4">
                  <p>Channel description, links, and info.</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ChannelPageClientLayout>
      </div>
    </>
  );
};

export default Page;

import ChannelPageClientLayout from "@/components/channel/channel-page-client-layout";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Image from "next/image";
import SmallVideoComponent from "@/components/SmallVideoComponent";

const Page = () => {
    return (
        <>
            {/* <HomePageClient /> */}
            <div className="">
                <ChannelPageClientLayout>
                    <div className="flex flex-col gap-3 md:gap-6 px-2 md:px-4 lg:px-8 xl:px-12 2xl:px-20">
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
                        <div className="flex gap-2 sm:gap-4 items-start mt-2 sm:mt-0">
                            <div className="left min-w-[100px] sm:min-w-[140px] md:min-w-[180px]">
                                <Image
                                    src={"/assets/thumb.jpg"}
                                    height={400}
                                    width={400}
                                    className="h-[100px] w-[100px]  sm:h-[140px] sm:w-[140px] md:w-[180px] md:h-[180px] object-cover rounded-full"
                                    alt="Channel Avatar"
                                />
                            </div>
                            <div
                                className="right flex flex-col justify-center h-[100px] sm:h-[140px] md:h-[180px] gap-2 w-auto">
                                <h2 className="text-[24px] sm:text-[32px] md:text-[40px] font-semibold text-black leading-none">
                                    Santosh Phaiju
                                </h2>
                                <div className="flex flex-wrap gap-1 items-center">
                                      <span className="font-medium text-black text-[14px]">
                                        @santoshphaiju321
                                      </span>
                                    <div className="h-0.5 w-0.5 bg-black rounded-full"></div>
                                    <span className="text-gray-700 text-[14px]">
                                        103 subscribers
                                    </span>
                                    <div className="h-0.5 w-0.5 bg-black rounded-full"></div>
                                    <span className="text-gray-700 text-[14px]">
                                    6 videos
                                  </span>
                                </div>
                                <div className="hidden sm:block">
                                      <span className="text-gray-600 text-[12px] sm:text-[14px]">
                                        {"Channel description goes here. This is a brief introduction about the channel, its content, and what viewers can expect.".slice(
                                            0,
                                            100
                                        )}
                                      </span>
                                    <span> </span>
                                    <span className="text-black font-medium cursor-pointer text-[12px] sm:text-[14px]">
                                        ...more
                                      </span>
                                </div>
                                <div className="hidden md:block">
                                    <Button variant={"default"} className="rounded-full">
                                        Subscribe
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="block sm:hidden w-full">
                              <span className="text-gray-600 text-[12px] sm:text-[14px]">
                                {"Channel description goes here. This is a brief introduction about the channel, its content, and what viewers can expect.".slice(
                                    0,
                                    100
                                )}
                              </span>
                            <span> </span>
                            <span className="text-black font-medium cursor-pointer text-[12px] sm:text-[14px]">
                                    ...more
                                </span>
                        </div>
                        <div className="block md:hidden w-full">
                            <Button variant={"default"} className="rounded-full w-full my-2">
                                Subscribe
                            </Button>
                        </div>
                        <div className="tabs flex gap-2 md:gap-4 min-h-[400px]">
                            <Tabs
                                defaultValue="home"
                                className="w-full flex justify-start flex-col items-start"
                            >
                                <TabsList className="flex gap-8 bg-transparent z-10">
                                    <TabsTrigger
                                        value="home"
                                        className="data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black pb-1 text-base  px-0 font-medium transition-colors shadow-none! rounded-none"
                                    >
                                        Home
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="videos"
                                        className="data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black pb-1 text-base  px-0 font-medium transition-colors shadow-none! rounded-none"
                                    >
                                        Videos
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="playlists"
                                        className="text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black pb-1 text-base  px-0 font-medium transition-colors shadow-none! rounded-none"
                                    >
                                        Playlists
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="about"
                                        className="text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black pb-1 text-base  px-0 font-medium transition-colors shadow-none! rounded-none"
                                    >
                                        About
                                    </TabsTrigger>
                                </TabsList>
                                <div className="w-full border -mt-[3px] z-0"></div>

                                <TabsContent value="home" className="mt-4">

                                    <div className={"font-bold text-xl mb-2 "}>
                                        Videos
                                    </div>

                                    <div className="videos flex gap-2">
                                        <SmallVideoComponent />
                                        <SmallVideoComponent />
                                        <SmallVideoComponent />
                                        <SmallVideoComponent />
                                    </div>

                                </TabsContent>
                                <TabsContent value="videos" className="mt-4">
                                    <div className="videos flex flex-wrap gap-4">
                                        <SmallVideoComponent videoSize={"medium"} />
                                        <SmallVideoComponent videoSize={"medium"} />
                                        <SmallVideoComponent videoSize={"medium"} />
                                        <SmallVideoComponent videoSize={"medium"} />
                                    </div>
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

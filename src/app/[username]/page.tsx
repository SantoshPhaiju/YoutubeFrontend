import ChannelPageClientLayout from "@/components/channel/channel-page-client-layout";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Image from "next/image";
import SmallVideoComponent from "@/components/SmallVideoComponent";
import {redirect} from "next/navigation";
import {getUserChannel} from "@/services/api/channel/channel.service";
import {cookies} from "next/headers";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {GoKebabHorizontal} from "react-icons/go";

const Page = async ({params}: { params: { username: string } }) => {
    const cookieStore = await cookies();
    const userData = JSON.parse(cookieStore.get("user")?.value || "{}");
    // console.log("userData : ", userData)
    // console.log(
    //     "params : ",
    //     params
    // )
    try {
        const username = (await params).username;
        const isOwner = username === userData.username;
        if (!username) {
            redirect('/');
        }

        const channelData = await getUserChannel(username, isOwner);
        if (!channelData) {
            return <p>Channel not found</p>;
        }

        return (
            <>
                {/* <HomePageClient /> */}
                <div className="">
                    <ChannelPageClientLayout>
                        <div className="flex flex-col gap-3 md:gap-6 px-0 md:px-4 medium:px-14 sm:px-4 lg:px-8 xl:px-12 2xl:px-20">
                            {/* Channel cover image */}
                            {/*{channelData?.data?.coverImage !== null ? <div>*/}
                            {/*    <Image*/}
                            {/*        src={"/assets/thumb.jpg"}*/}
                            {/*        height={900}*/}
                            {/*        width={900}*/}
                            {/*        className="h-auto max-h-[180px] w-full object-cover rounded-2xl"*/}
                            {/*        alt="Channel Cover"*/}
                            {/*    />*/}
                            {/*</div> : (*/}
                            {/*    <div className={"border cursor-pointer border-border h-[180px] w-full object-cover rounded-2xl"}>*/}
                            {/*        */}
                            {/*    </div>*/}
                            {/*)}*/}
                            {channelData?.data?.coverImage !== null && <div>
                                <Image
                                    src={channelData?.data?.coverImage || "/assets/thumb.jpg"}
                                    height={900}
                                    width={900}
                                    className="h-auto max-h-[180px] w-full object-cover object-center rounded-2xl"
                                    alt="Channel Cover"
                                />
                            </div>}
                            <div className="flex gap-2 sm:gap-4 items-start mt-2 sm:mt-0">
                                <div className="left min-w-[100px] sm:min-w-[140px] md:min-w-[180px]">
                                    <Image
                                        src={channelData?.data?.avatar || "/assets/thumb.jpg"}
                                        height={400}
                                        width={400}
                                        className="h-[100px] w-[100px]  sm:h-[140px] sm:w-[140px] md:w-[180px] md:h-[180px] object-cover rounded-full"
                                        alt="Channel Avatar"
                                    />
                                </div>
                                <div
                                    className="right flex flex-col justify-center h-[100px] sm:h-[140px] md:h-[180px] gap-2 w-auto">
                                    <h2 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[40px] font-semibold text-black leading-none">
                                        {channelData?.data?.fullname || "Channel Name"}
                                    </h2>
                                    <div className="flex flex-wrap gap-1 items-center">
                                      <span className="font-medium text-black text-[14px]">
                                        @{channelData?.data?.username || "username"}
                                      </span>
                                        <div className="h-0.5 w-0.5 bg-black rounded-full"></div>
                                        <span className="text-gray-700 text-[14px]">
                                        {channelData?.data?.subscribersCount || 0} subscribers
                                    </span>
                                        <div className="h-0.5 w-0.5 bg-black rounded-full"></div>
                                        <span className="text-gray-700 text-[14px]">
                                    {channelData?.data?.videos.length || 0} videos
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
                                        <span
                                            className="text-black font-medium cursor-pointer text-[12px] sm:text-[14px]">
                                        ...more
                                      </span>
                                    </div>
                                    {!isOwner ? <div className="hidden md:block">
                                        <Button variant={"default"} className="rounded-full">
                                            Subscribe
                                        </Button>
                                    </div> : (
                                        <div className="hidden md:block">
                                            <Button variant={"outline"} className="rounded-full cursor-pointer">
                                                Update Channel Details
                                            </Button>
                                        </div>
                                    )}
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
                                            className="data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black pb-1 text-base  px-0 font-medium transition-colors shadow-none! rounded-none cursor-pointer"
                                        >
                                            Home
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="videos"
                                            className="data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black pb-1 text-base  px-0 font-medium transition-colors shadow-none! rounded-none cursor-pointer"
                                        >
                                            Videos
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="playlists"
                                            className="text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black pb-1 text-base  px-0 font-medium transition-colors shadow-none! rounded-none cursor-pointer"
                                        >
                                            Playlists
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="about"
                                            className="text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black pb-1 text-base  px-0 font-medium transition-colors shadow-none! rounded-none cursor-pointer"
                                        >
                                            About
                                        </TabsTrigger>
                                    </TabsList>
                                    <div className="w-full border border-border -mt-[3px] z-0"></div>

                                    <TabsContent value="home" className="mt-4 w-full">

                                        <div className={"font-bold text-xl mb-2 "}>
                                            Videos
                                        </div>

                                        <div className="videos flex w-full gap-4 overflow-x-auto p-1">
                                            <div className={cn(`video h-auto w-full small:w-[50%] sm:w-[44%] md:w-[38%] medium:w-[33%] xl:w-[25%] aspect-video cursor-pointer`)}>
                                                <div className="thumbnail">
                                                    <Link href="/watch?v=123">
                                                        <Image
                                                            src={"/assets/thumb.jpg"}
                                                            height={200}
                                                            width={300}
                                                            className={cn(`h-auto min-h-[140px] w-full rounded-md object-cover`)}
                                                            alt="VideoComponent"
                                                        />
                                                    </Link>
                                                </div>

                                                <div className="details py-1 pt-2 flex">
                                                    <div className="flex flex-col gap-1 px-1">
                                                        <div className="title text-sm text-black line-clamp-2">
                                                            How to Make Money Using Google Maps in 2025 ($100 - $200 PER DAY)
                                                            something
                                                        </div>
                                                        <div className="flex flex-col mt-px">
                                                            {/*<div className="channelName text-sm text-gray-600 flex justify-start items-center gap-1">*/}
                                                            {/*    Santosh Phaiju <MdVerified />*/}
                                                            {/*</div>*/}
                                                            <div className="flex justify-start items-center gap-2 text-gray-600 text-sm">
                                                                <div className="views">99k views</div>
                                                                <div className="dot h-1 w-1 bg-black rounded-full"></div>

                                                                <div className="publishedDate">3 days ago</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="threeDot h-full">
                                                        <GoKebabHorizontal className={"rotate-90 text-xl"} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cn(`video h-auto w-full small:w-[50%] sm:w-[44%] md:w-[38%] medium:w-[33%] xl:w-[25%] aspect-video cursor-pointer`)}>
                                                <div className="thumbnail">
                                                    <Link href="/watch?v=123">
                                                        <Image
                                                            src={"/assets/thumb.jpg"}
                                                            height={200}
                                                            width={300}
                                                            className={cn(`h-auto min-h-[140px] w-full rounded-md object-cover`)}
                                                            alt="VideoComponent"
                                                        />
                                                    </Link>
                                                </div>

                                                <div className="details py-1 pt-2 flex">
                                                    <div className="flex flex-col gap-1 px-1">
                                                        <div className="title text-sm text-black line-clamp-2">
                                                            How to Make Money Using Google Maps in 2025 ($100 - $200 PER DAY)
                                                            something
                                                        </div>
                                                        <div className="flex flex-col mt-px">
                                                            {/*<div className="channelName text-sm text-gray-600 flex justify-start items-center gap-1">*/}
                                                            {/*    Santosh Phaiju <MdVerified />*/}
                                                            {/*</div>*/}
                                                            <div className="flex justify-start items-center gap-2 text-gray-600 text-sm">
                                                                <div className="views">99k views</div>
                                                                <div className="dot h-1 w-1 bg-black rounded-full"></div>

                                                                <div className="publishedDate">3 days ago</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="threeDot h-full">
                                                        <GoKebabHorizontal className={"rotate-90 text-xl"} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </TabsContent>
                                    <TabsContent value="videos" className="mt-4">
                                        <div
                                            className="videos grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4 gap-4">
                                            <SmallVideoComponent videoSize={"medium"}/>
                                            <SmallVideoComponent videoSize={"medium"}/>
                                            <SmallVideoComponent videoSize={"medium"}/>
                                            <SmallVideoComponent videoSize={"medium"}/>
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
    } catch (error) {
        throw new Error("Failed to fetch channel data. Please try again later!");
    }
};

export default Page;

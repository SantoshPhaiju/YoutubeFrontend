import ChannelPageClientLayout from "@/components/channel/channel-page-client-layout";
import SmallVideoComponent from "@/components/SmallVideoComponent";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserChannel } from "@/services/api/channel/channel.service";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { username: string } }) => {
  const cookieStore = await cookies();
  const userData = JSON.parse(cookieStore.get("user")?.value || "{}");

  try {
    const username = (await params).username;
    if (!username) {
      redirect("/");
    }

    const channelData = await getUserChannel(username);
    if (!channelData) {
      return <p>Channel not found</p>;
    }

    const isOwner = userData?._id === channelData?.data?._id;

    const isSubscribedTo = channelData?.data?.isSubscribed || false;

    const publicVideos = channelData?.data?.videos.filter(
      (video: any) => video.visibility === "public",
    );
    const allVideos = channelData?.data?.videos;
    const channelVideos = isOwner ? allVideos : publicVideos;
    const avatar = await getValidImage(channelData.data.avatar);
    const coverImage = await getValidImage(channelData.data.coverImage);

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
              {channelData?.data?.coverImage !== null && (
                <div>
                  <Image
                    src={coverImage}
                    height={900}
                    width={900}
                    className="h-auto max-h-[180px] w-full object-cover object-center rounded-2xl"
                    alt="Channel Cover"
                  />
                </div>
              )}
              <div className="flex gap-2 sm:gap-4 items-start mt-2 sm:mt-0">
                <div className="left min-w-[100px] sm:min-w-[140px] md:min-w-[180px]">
                  <Image
                    src={avatar}
                    height={400}
                    width={400}
                    className="h-[100px] w-[100px]  sm:h-[140px] sm:w-[140px] md:w-[180px] md:h-[180px] object-cover rounded-full"
                    alt="Channel Avatar"
                  />
                </div>
                <div className="right flex flex-col justify-center h-[100px] sm:h-[140px] md:h-[180px] gap-2 w-auto">
                  <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold text-black leading-none">
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
                      {channelVideos.length || 0} videos
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-gray-600 text-[12px] sm:text-[14px]">
                      {"Channel description goes here. This is a brief introduction about the channel, its content, and what viewers can expect.".slice(
                        0,
                        40,
                      )}
                    </span>
                    <span> </span>
                    <span className="text-black font-medium cursor-pointer text-[12px] sm:text-[14px]">
                      ...more
                    </span>
                  </div>
                  {!isOwner ? (
                    <div className="hidden md:block">
                      {!isSubscribedTo ? (
                        <Button variant={"default"} className="rounded-full">
                          Subscribe
                        </Button>
                      ) : (
                        <Button variant={"outline"} className="rounded-full">
                          Subscribed
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="hidden md:block">
                      <Button
                        variant={"outline"}
                        className="rounded-full cursor-pointer"
                      >
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
                    40,
                  )}
                </span>
                <span> </span>
                <span className="text-black font-medium cursor-pointer text-[12px] sm:text-[14px]">
                  ...more
                </span>
              </div>
              <div className="block md:hidden w-full">
                {!isOwner ? (
                  <div className="block md:hidden">
                    <Button
                      variant={"default"}
                      className="rounded-full w-full my-2"
                    >
                      Subscribe
                    </Button>
                  </div>
                ) : (
                  <div className="block md:hidden w-full">
                    <Button
                      variant={"outline"}
                      className="rounded-full cursor-pointer w-full"
                    >
                      Update Channel Details
                    </Button>
                  </div>
                )}
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
                    {channelVideos.length > 0 ? (
                      <>
                        <div className={"font-bold text-xl mb-2 "}>Videos</div>

                        <div className="videos flex w-full gap-2">
                          <Carousel className={"w-full"}>
                            <CarouselContent className={"w-full px-0 gap-1"}>
                              {channelVideos.map(
                                (video: any, index: number) => (
                                  <CarouselItem
                                    key={index}
                                    className={
                                      "md:basis-1/2 lg:basis-1/3 2xl:basis-1/4 3xl:basis-1/5 w-full"
                                    }
                                  >
                                    <SmallVideoComponent video={video} />
                                  </CarouselItem>
                                ),
                              )}
                            </CarouselContent>
                            <CarouselPrevious
                              className={
                                "-left-4! top-[38%] z-50! cursor-pointer"
                              }
                            />
                            <CarouselNext
                              className={
                                "-right-4! top-[38%] cursor-pointer z-50!"
                              }
                            />
                          </Carousel>
                        </div>
                      </>
                    ) : (
                      <div className="w-full rounded-2xl border border-dashed border-border bg-muted/40 px-6 py-12 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-background border border-border text-xl">
                          🎬
                        </div>
                        <p className="text-lg font-semibold text-foreground">
                          {!isOwner
                            ? "This channel doesn't have any published content yet."
                            : "No Content Yet!"}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {isOwner
                            ? "You have not uploaded anything yet. Start by sharing your first video."
                            : "This channel has not published any content right now. Check back soon."}
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="videos" className="mt-4 w-full">
                    {channelVideos.length > 0 ? (
                      <div className="videos grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4 gap-4">
                        {channelVideos.map((video: any, index: number) => (
                          <div key={index}>
                            <SmallVideoComponent video={video} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="w-full rounded-2xl border border-dashed border-border bg-muted/40 px-6 py-12 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-background border border-border text-xl">
                          🎥
                        </div>
                        <p className="text-lg font-semibold text-foreground">
                          No videos yet
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {isOwner
                            ? "You have not uploaded any videos yet. Publish one to get started."
                            : "This channel has no published videos at the moment."}
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="playlists" className="mt-4 w-full">
                    <div className="w-full rounded-2xl border border-dashed border-border bg-muted/40 px-6 py-12 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-background border border-border text-xl">
                        📂
                      </div>
                      <p className="text-lg font-semibold text-foreground">
                        No playlists yet
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {isOwner
                          ? "Create playlists to organize your videos for your audience."
                          : "This channel has not created any public playlists yet."}
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="about" className="mt-4 w-full">
                    <div className="w-full rounded-2xl border border-dashed border-border bg-muted/40 px-6 py-12 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-background border border-border text-xl">
                        🚧
                      </div>
                      <p className="text-lg font-semibold text-foreground">
                        Coming soon
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        We are working on a richer About section for this
                        channel.
                      </p>
                    </div>
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

async function getValidImage(url?: string) {
  if (!url) return "/assets/thumb.jpg";

  try {
    const res = await fetch(url, {
      method: "HEAD",
      cache: "no-store",
    });

    return res.ok ? url : "/assets/thumb.jpg";
  } catch {
    return "/assets/thumb.jpg";
  }
}

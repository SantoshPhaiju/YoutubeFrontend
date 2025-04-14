import SemiNav from "@/components/semi-nav";
import SemiVideo from "@/components/semiVideoComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ClientVideoPageLayout from "@/components/video/client-vidoepage-layout";
import Image from "next/image";

interface WatchPageProps {
  searchParams: {
    v?: string; // Query parameter (optional because it might be missing)
  };
}

const Page = async ({ searchParams }: WatchPageProps) => {
  const videoId = (await searchParams).v;

  if (!videoId) {
    return <p>Invalid video ID</p>;
  }

  console.log(`Loading video: ${videoId}`);

  return (
    <>
      <ClientVideoPageLayout>
        <div className="px-[64px] pb-2 z-0">
          {/* <Videopage /> */}
          <div className="w-full px-2 mx-auto h-auto cursor-pointer flex justify-center items-start gap-6">
            <div className="leftContainer w-full flex flex-col gap-3">
              <div className="videoPlayer w-full rounded-xl overflow-hidden">
                <Image
                  src={"/assets/thumb.jpg"}
                  height={200}
                  width={300}
                  className="h-[70vh] w-[100%] object-cover"
                  alt="VideoComponent"
                />
              </div>
              <div className="videoDetails flex flex-col gap-3">
                <div className="text-xl font-bold leading-tight">
                  Mitwa - Lyrical Song | KANK | Shahrukh Khan, Rani Mukherjee |
                  Shankar Ehsaan Loy | Romantic Song
                </div>
                <div className="flex justify-between border border-black">
                  <div className="channel flex gap-5 items-center">
                    <div className="w-[40px] h-[40px] border border-black z-0">
                      <Avatar className="">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                          className="rounded-[50%] z-0"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="">SantoshMaster</div>
                    <Button variant="destructive">Subscribe</Button>
                  </div>
                  <div className="flex justify-end gap-5 items-center mr-10">
                    <Button variant="default">Like</Button>
                    <Button variant="default">Share</Button>
                    <Button variant="default">...</Button>
                  </div>
                </div>
              </div>
              <div className="descriptionSection h-[100px] w-full bg-gray-100 rounded-xl"></div>
              <div className="commentSection h-[1000px] w-full border"></div>
            </div>
            <div className="rightContainer w-[380px]">
              <SemiNav />
              <SemiVideo />
              <SemiVideo />
              <SemiVideo />
              <SemiVideo />
            </div>
          </div>
        </div>
      </ClientVideoPageLayout>
    </>
  );
};

export default Page;

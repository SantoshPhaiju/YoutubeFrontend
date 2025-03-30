"use client";

import { NavbarContext } from "@/context/navbar-context";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import { useContext, useEffect } from "react";
import SemiNav from "./semi-nav";
import SemiVideo from "./semiVideoComponent";
import { Button } from "./ui/button";

const Videopage = () => {
  const { setIsSidebarOpen, setShowCategories } = useContext(NavbarContext);
  useEffect(() => {
    setIsSidebarOpen(false);
    setShowCategories(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full px-2 py-2 mx-auto h-auto cursor-pointer flex justify-center items-start gap-6">
        <div className="leftContainer w-[70%] flex flex-col gap-3">
          <div className="videoPlayer w-full rounded-xl overflow-hidden">
            <Image
              src={"/assets/thumb.jpg"}
              height={200}
              width={300}
              className="h-[450px] w-[100%] object-cover"
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
                <div className="w-[40px] h-[40px]">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="rounded-[50%]"
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
          <div className="descriptionSection h-[100px] w-full bg-gray-100 rounded-xl">

          </div>
          <div className="commentSection h-[1000px] w-full border"></div>
        </div>
        <div className="rightContainer w-[30%] border border-blue-600">
          <SemiNav />
          <SemiVideo />
          <SemiVideo />
          <SemiVideo />
          <SemiVideo />
        </div>
      </div>
    </>
  );
};

export default Videopage;

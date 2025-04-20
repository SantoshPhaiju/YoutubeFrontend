"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaYoutube } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

import { BiCut } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa6";
import { GoVideo } from "react-icons/go";
import { GrLike } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import { MdKeyboardArrowRight, MdOutlineSubscriptions } from "react-icons/md";
import { RiGraduationCapLine, RiPlayList2Line } from "react-icons/ri";
import { SiYoutubeshorts } from "react-icons/si";
import SidebarItem from "../sidebar-item";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const topLinks = [
  {
    title: "Home",
    icon: <IoHomeOutline />,
    link: "/",
  },
  {
    title: "Shorts",
    icon: <SiYoutubeshorts />,
    link: "/",
  },
  {
    title: "Subscriptions",
    icon: <MdOutlineSubscriptions />,
    link: "/",
  },
];

const lowerLinks = [
  {
    title: "History",
    icon: <LuHistory />,
    link: "/",
  },
  {
    title: "Playlists",
    icon: <RiPlayList2Line />,
    link: "/",
  },
  {
    title: "Your Videos",
    icon: <GoVideo />,
    link: "/",
  },
  {
    title: "Your Courses",
    icon: <RiGraduationCapLine />,
    link: "/",
  },
  {
    title: "Watch Later",
    icon: <FaRegClock />,
    link: "/",
  },
  {
    title: "Liked Videos",
    icon: <GrLike />,
    link: "/",
  },
  {
    title: "Your Clips",
    icon: <BiCut />,
    link: "/",
  },
];

interface IOverlaySidebarProps {
  showOverlaySidebar: boolean;
  setShowOverlaySidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const OverlaySidebar = ({
  showOverlaySidebar,
  setShowOverlaySidebar,
}: IOverlaySidebarProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (showOverlaySidebar) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "auto";
    }
  }, [showOverlaySidebar]);
  return (
    <div
      onClick={(e) => {
        console.log("e.target.id", e.target);

        setShowOverlaySidebar(false);
      }}
    >
      {showOverlaySidebar && (
        <div className="z-50 fixed top-0 left-0 w-full h-full bg-black/70"></div>
      )}
      <AnimatePresence>
        {showOverlaySidebar && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.2 }}
            className={cn(
              `py-2 z-50 w-[240px] 2xl:w-[280px] h-full bg-white fixed top-0 left-0`,
              {}
            )}
            onClick={() => setShowOverlaySidebar(false)}
          >
            <div className="header px-4">
              <div className="logo select-none flex justify-start items-center gap-1 text-2xl font-semibold">
                <div
                  onClick={() => {
                    setShowOverlaySidebar(false);
                  }}
                  className="hamburger cursor-pointer p-3 flex flex-col gap-[3px] justify-center items-center rounded-full hover:bg-gray-200"
                >
                  <RxHamburgerMenu />
                </div>
                <FaYoutube className="text-[24px] text-red-700" />
                <Link href={"/"} className="text-[24px]">
                  Santosh
                </Link>
              </div>
            </div>
            <ScrollArea className="mt-4 px-4 h-[88vh]">
              <div className="">
                <div className="top flex flex-col gap-2 w-full">
                  {topLinks.map((link, index) => {
                    return (
                      <div key={index}>
                        <SidebarItem
                          name={link.title}
                          icon={link.icon}
                          link={link.link}
                        />
                      </div>
                    );
                  })}
                </div>
                <hr />
                <div className="py-4">
                  <div className="flex justify-start items-center px-4 py-2 gap-1 cursor-pointer hover:bg-gray-200 rounded-lg text-lg text-gray-700">
                    <div>You</div>
                    <div>
                      <MdKeyboardArrowRight className="text-2xl" />
                    </div>
                  </div>

                  <div className="top py-3 flex flex-col gap-2 w-full">
                    {lowerLinks.map((link, index) => {
                      return (
                        <div key={index}>
                          <SidebarItem
                            name={link.title}
                            icon={link.icon}
                            link={link.link}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <hr />

                  <div className="py-4 px-2 text-sm">
                    About Press Copyright Contact us Creators Advertise
                    Developers
                  </div>
                  <div className="py-4 px-2 text-sm">
                    Terms Privacy Policy & Safety How YouTube worksTest new
                    features © 2025 Google LLC
                  </div>
                </div>
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OverlaySidebar;

"use client";

import { cn } from "@/lib/utils";
import { BiCut } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa6";
import { GoVideo } from "react-icons/go";
import { GrLike } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import { MdKeyboardArrowRight, MdOutlineSubscriptions } from "react-icons/md";
import { RiGraduationCapLine, RiPlayList2Line } from "react-icons/ri";
import { SiYoutubeshorts } from "react-icons/si";
import SidebarItem from "./sidebar-item";
import IconSidebarItem from "./sidebarcomponents/icon-sidebar-item";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

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
    title: "Your Vidoes",
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
    title: "Liked Vidoes",
    icon: <GrLike />,
    link: "/",
  },
  {
    title: "Your Clips",
    icon: <BiCut />,
    link: "/",
  },
];

const Sidebar = ({
  isSidebarOpen,
}: {
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="bg-white z-50">
      {isSidebarOpen && (
        <ScrollArea className={cn(`h-[94vh] px-4 py-4 mt-[56px] w-auto`)}>
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
                About Press Copyright Contact us Creators Advertise Developers
              </div>
              <div className="py-4 px-2 text-sm">
                Terms Privacy Policy & Safety How YouTube worksTest new features
                © 2025 Google LLC
              </div>
            </div>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )}
      {isSidebarOpen === false && (
        <ScrollArea className={cn(`h-[94vh] px-1 py-4 mt-[56px] w-auto pb-12`)}>
          <div className="top flex flex-col gap-2 w-full">
            {topLinks.map((link, index) => {
              return (
                <div key={index}>
                  <IconSidebarItem
                    name={link.title}
                    icon={link.icon}
                    link={link.link}
                  />
                </div>
              );
            })}
          </div>

          <div className="">
            <div className="top py-3 flex flex-col gap-2 w-full">
              {lowerLinks.map((link, index) => {
                return (
                  <div key={index}>
                    <IconSidebarItem
                      name={link.title}
                      icon={link.icon}
                      link={link.link}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )}
    </div>
  );
};

export default Sidebar;

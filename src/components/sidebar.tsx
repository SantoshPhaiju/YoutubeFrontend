"use client";

import { cn } from "@/lib/utils";
import { useSubscriptionQuery } from "@/services/queries/subscriptionQuery";
import { useEffect, useState } from "react";
import { BiCut } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa6";
import { GoVideo } from "react-icons/go";
import { GrLike } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";
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
  // {
  //   title: "Subscriptions",
  //   icon: <MdOutlineSubscriptions />,
  //   link: "/",
  // },
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
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const { data, isLoading, isError, error } = useSubscriptionQuery();
  useEffect(() => {
    setSubscriptions(data?.data || []);
  }, [data]);

  if (isLoading) return <div>Loading data...</div>;

  if (isError) return <div>Error loading data: {error.message}</div>;

  return (
    <div className="bg-white z-50">
      {isSidebarOpen && (
        <ScrollArea className={cn(`h-[94vh] py-4 mt-14 w-auto`)}>
          <div className="">
            <div className="top px-4 flex mb-2 flex-col gap-1 w-full">
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
            <hr
              className={"bg-black/30 rounded-full border-none h-px w-full "}
            />
            <div className="py-2 px-4">
              <div className="flex justify-start items-center px-4 py-1.5 gap-1 cursor-pointer hover:bg-gray-200 rounded-lg text-md text-gray-700">
                <div>Subscriptions</div>
                <div>
                  <MdKeyboardArrowRight className="text-2xl" />
                </div>
              </div>

              <div className="top py-2 flex flex-col gap-1 w-full">
                {subscriptions.map((item, index) => {
                  return (
                    <div key={index}>
                      <SidebarItem
                        name={item?.channel?.fullname || "Unknown Channel"}
                        image={item?.channel?.avatar}
                        link={`/${item?.channel?.username || ""}`}
                      />
                    </div>
                  );
                })}
              </div>
              </div>
            <hr
              className={"bg-black/30 rounded-full border-none h-px w-full "}
            />
            <div className="py-2 px-4">
              <div className="flex justify-start items-center px-4 py-1.5 gap-1 cursor-pointer hover:bg-gray-200 rounded-lg text-md text-gray-700">
                <div>You</div>
                <div>
                  <MdKeyboardArrowRight className="text-2xl" />
                </div>
              </div>

              <div className="top py-2 flex flex-col gap-1 w-full">
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

              <hr className={"bg-gray-300 border-none h-px w-full "} />

              <div className="py-4 px-2 text-sm">
                About Press Copyright Contact us Creators Advertise Developers
              </div>
              <div className="py-4 px-2 text-sm">
                Terms Privacy Policy & Safety How YouTube worksTest new features
                © 2025 Google LLC
              </div>
            </div>
          </div>
          <ScrollBar orientation="vertical" className="w-0 h-0" />
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
          <ScrollBar orientation="vertical" className="w-0 h-0" />
        </ScrollArea>
      )}
    </div>
  );
};

export default Sidebar;

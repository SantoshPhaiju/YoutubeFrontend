"use client";

import { FaHome } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import SidebarItem from "./sidebar-item";

const topLinks = [
  {
    title: "Home",
    icon: <FaHome />,
    link: "/",
  },
  {
    title: "Shorts",
    icon: <SiYoutubeshorts />,
    link: "/",
  },
  {
    title: "Subscriptions",
    icon: <MdSubscriptions />,
    link: "/",
  },
];

const Sidebar = () => {
  return (
    <div className="h-screen px-4 py-4 w-[240px] mt-[56px] fixed top-0 left-0 ">
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
    </div>
  );
};

export default Sidebar;

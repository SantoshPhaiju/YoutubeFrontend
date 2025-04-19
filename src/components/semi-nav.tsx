"use client";

import { cn } from "@/lib/utils";
import SemiNavBadge from "./semi-nav-badge";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const badgeData = [
  {
    name: "All",
    link: "/",
  },
  {
    name: "Music",
    link: "/",
  },
  {
    name: "Mixes",
    link: "/",
  },
  {
    name: "Videos",
    link: "/",
  },
  {
    name: "Sports",
    link: "/",
  },
  {
    name: "T-Series",
    link: "/",
  },
  {
    name: "Podcasts",
    link: "/",
  },
  {
    name: "New Videos",
    link: "/",
  },
  {
    name: "From Me",
    link: "/",
  },
  {
    name: "Watch Later",
    link: "/",
  },
  {
    name: "Football",
    link: "/",
  },
  {
    name: "Cricket",
    link: "/",
  },
  {
    name: "Movies",
    link: "/",
  },
  {
    name: "Flims",
    link: "/",
  },
  {
    name: "Music Videos",
    link: "/",
  },
];

const SemiNav = () => {
  return (
    <ScrollArea className={cn("w-[94%] mb-1 px-0 z-0")}>
      <div className="h-auto mb-4 w-full flex justify-start items-center gap-3 whitespace-nowrap">
        {badgeData.map((badge, index) => {
          return (
            <div key={index}>
              <SemiNavBadge badgeName={badge.name} badgeLink={badge.link} />
            </div>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" className="mb-1" />
    </ScrollArea>
  );
};

export default SemiNav;

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const IconSidebarItem = ({
  icon,
  link,
  name,
}: {
  icon: React.ReactNode;
  link: string;
  name: string;
}) => {
  return (
    <div>
      <Link
        href={link}
        className={cn(
          "flex flex-col items-center w-auto gap-2 py-2 rounded-lg hover:bg-gray-200 cursor-pointer overflow-hidden"
        )}
      >
        <div className="icon text-xl">{icon}</div>
        <div className={cn("text-[10px]")}>{name}</div>
      </Link>
    </div>
  );
};

export default IconSidebarItem;

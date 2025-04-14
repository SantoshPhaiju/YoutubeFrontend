import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const SidebarItem = ({
  icon,
  name,
  link,
}: {
  icon: React.ReactNode;
  name: string;
  link: string;
}) => {
  return (
    <Link
      href={link}
      className={cn(
        "flex items-center w-auto gap-6 px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer overflow-hidden"
      )}
    >
      <div className="icon text-xl">{icon}</div>
      <div className={cn("text-md")}>{name}</div>
    </Link>
  );
};

export default SidebarItem;

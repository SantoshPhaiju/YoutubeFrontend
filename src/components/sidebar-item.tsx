import { cn } from "@/lib/utils";
import Image from "next/image";
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
        "flex items-center w-auto gap-6 px-3 py-2 rounded-lg hover:bg-gray-200 cursor-pointer overflow-hidden "
      )}
    >
      {name !== "Shorts" ? (
        <div className="icon text-lg font-bold">{icon}</div>
      ) : (
        <Image
          src={"/assets/ytshorts.webp"}
          alt="shorts"
          width={15}
          height={15}
          className=""
        />
      )}
      <div className={cn("text-sm")}>{name}</div>
    </Link>
  );
};

export default SidebarItem;

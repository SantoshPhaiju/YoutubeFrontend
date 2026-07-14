import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const SidebarItem = ({
  icon,
  name,
  link,
  image,
}: {
  icon?: React.ReactNode;
  name: string;
  link: string;
  image?: string;
}) => {
  const [imgSrc, setImgSrc] = useState(image || "/assets/thumb.jpg");
  return (
    <Link
      href={link}
      className={cn(
        "flex items-center w-auto gap-6 px-3 py-2 rounded-lg hover:bg-gray-200 cursor-pointer overflow-hidden ",
      )}
    >
      {icon ? (
        <div className="icon text-lg font-bold">{icon}</div>
      ) : (
        <Image
          src={imgSrc}
          alt="shorts"
          width={15}
          height={15}
          className="rounded-full object-cover w-5 h-5"
          onError={() => setImgSrc("/assets/thumb.jpg")}
        />
      )}
      <div className={cn("text-sm")}>{name}</div>
    </Link>
  );
};

export default SidebarItem;

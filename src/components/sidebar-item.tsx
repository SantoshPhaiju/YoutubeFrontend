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
        <div className="w-8 h-6 rounded-full overflow-hidden bg-black">
          <Image
            src={imgSrc}
            alt="shorts"
            width={1440}
            height={1440}
            className="rounded-full object-cover w-full h-full"
            onError={() => setImgSrc("/assets/thumb.jpg")}
          />
        </div>
      )}
      <div className="flex justify-between items-center w-full ">
        <div className={cn("text-sm")}>{name}</div>
        {image && <div className="h-1 w-1 bg-blue-800 rounded-full"></div>}
      </div>
    </Link>
  );
};

export default SidebarItem;

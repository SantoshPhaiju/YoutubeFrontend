"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ResultItemAvatar = ({
  fullname,
  avatar,
  channelLink,
}: {
  fullname: string;
  avatar: string;
  channelLink: string;
}) => {
  return (
    <div>
      <Link
        target="_blank"
        href={channelLink}
        className="flex gap-2 items-center"
        onClick={() => {}}
      >
        <Avatar className="w-6 h-6">
          <AvatarImage src={avatar} />
          <AvatarFallback>{fullname || "CN"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-normal text-[12px] md:text-[14px]">
            {fullname || "Channel Name"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ResultItemAvatar;

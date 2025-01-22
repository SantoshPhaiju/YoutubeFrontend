"use client";

import Link from "next/link";
import { Badge } from "./ui/badge";

const SemiNavBadge = ({
  badgeName,
  badgeLink,
}: {
  badgeName: string;
  badgeLink: string;
}) => {
  return (
    <div>
      <Link
        href={badgeLink}
        // className="flex w-[100%] items-center gap-6 px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer"
      >
        <Badge variant={"secondary"} className="py-1 whitespace-nowrap w-auto cursor-pointer text-[14px]">
          {badgeName}
        </Badge>
      </Link>
    </div>
  );
};

export default SemiNavBadge;

"use client";

import Link from "next/link";
import { Badge } from "./ui/badge";

const SemiNavBadge = ({
  badgeName,
  badgeLink,
  selected = false,
}: {
  badgeName: string;
  badgeLink: string;
  selected?: boolean;
}) => {
  return (
    <div>
      <Link
        href={badgeLink}
        // className="flex w-full items-center gap-6 px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer"
      >
        <Badge
          variant={selected ? "default" : "secondary"}
          className="py-1 px-3 whitespace-nowrap w-auto cursor-pointer text-[14px]"
        >
          {badgeName}
        </Badge>
      </Link>
    </div>
  );
};

export default SemiNavBadge;

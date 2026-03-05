"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const SeeMoreComponent = ({
  videoDescription,
}: {
  videoDescription: string;
}) => {
  const [isSeeMore, setIsSeeMore] = useState(false);
  return (
    <>
      <div className="description text-[14px] font-medium font-roboto text-gray-800 leading-normal">
        {isSeeMore
          ? videoDescription
          : videoDescription.substring(0, 200) + "..."}
        <span
          className={cn(" cursor-pointer", {
            "underline underline-offset-2 ml-2 text-blue-500":
              !isSeeMore,
          })}
          onClick={() => setIsSeeMore(!isSeeMore)}
        >
          {isSeeMore ? (
            <div className="mt-4 font-medium text-gray-800 text-[14px]">
              Show less
            </div>
          ) : (
            "more"
          )}
        </span>
      </div>
    </>
  );
};

export default SeeMoreComponent;

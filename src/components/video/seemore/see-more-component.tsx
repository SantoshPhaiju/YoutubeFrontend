// "use client";

// import { cn } from "@/lib/utils";
// import { useState } from "react";

// const SeeMoreComponent = ({
//   videoDescription,
// }: {
//   videoDescription: string;
// }) => {
//   const [isSeeMore, setIsSeeMore] = useState(false);
//   return (
//     <>
//       <div className="description text-[14px] font-medium font-roboto text-gray-800 leading-normal">
//         {isSeeMore
//           ? videoDescription
//           : videoDescription.substring(0, 200) + "..."}
//         <span
//           className={cn(" cursor-pointer", {
//             "underline underline-offset-2 ml-2 text-blue-500": !isSeeMore,
//           })}
//           onClick={() => setIsSeeMore(!isSeeMore)}
//         >
//           {isSeeMore ? (
//             <span className="mt-4 font-medium text-gray-800 text-[14px]">
//               Show less
//             </span>
//           ) : (
//             "more"
//           )}
//         </span>
//       </div>
//     </>
//   );
// };

// export default SeeMoreComponent;
"use client";

import { useMemo, useState } from "react";

const SeeMoreComponent = ({
  videoDescription,
}: {
  videoDescription: string;
}) => {
  const [isSeeMore, setIsSeeMore] = useState(false);

  const limit = 200;

  const shouldTruncate = videoDescription.length > limit;

  const truncatedDescription = useMemo(() => {
    if (!shouldTruncate) return videoDescription;

    const truncated = videoDescription.slice(0, limit);

    // Don't cut the last word in half
    return truncated.replace(/\s+\S*$/, "") + "...";
  }, [videoDescription, shouldTruncate]);

  return (
    <div className="text-[14px] font-medium font-roboto text-gray-800 leading-normal whitespace-pre-wrap wrap-break-word">
      {isSeeMore ? videoDescription : truncatedDescription}

      {shouldTruncate && (
        <span
          onClick={() => setIsSeeMore((prev) => !prev)}
          className="ml-2 cursor-pointer text-blue-500 hover:underline"
        >
          {isSeeMore ? "Show less" : "more"}
        </span>
      )}
    </div>
  );
};

export default SeeMoreComponent;

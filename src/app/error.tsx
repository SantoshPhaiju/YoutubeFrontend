"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={"flex justify-center items-center flex-col h-screen gap-4"}>
      <h2 className={"text-3xl"}>Something went wrong!</h2>
      <p className={"text-lg"}>{error.message}</p>
      <button
        className={"cursor-pointer"}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}

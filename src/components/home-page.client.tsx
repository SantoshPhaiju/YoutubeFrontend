"use client";

import { NavbarContext } from "@/context/navbar-context";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { useContext, useEffect } from "react";
import Sidebar from "./sidebar";

const HomePageClient = () => {
  const { setIsSidebarOpen, setShowCategories, isSidebarOpen } =
    useContext(NavbarContext);

  useEffect(() => {
    const handleResize = () => {
      const isWide = window.innerWidth >= 1024; // Tailwind lg breakpoint
      setIsSidebarOpen(isWide);
      setShowCategories(true);
    };

    // ✅ Initial check on mount
    handleResize();

    // ✅ Listen to resize event
    window.addEventListener("resize", handleResize);

    // ✅ Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarOpen, setShowCategories]);

  return (
    <AnimatePresence>
      <div
        className={cn("fixed left-0 top-0 overflow-hidden hidden md:block", {
          "w-[250px]": isSidebarOpen,
          "w-0 md:w-[80px]": isSidebarOpen === false,
        })}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    </AnimatePresence>
  );
};

export default HomePageClient;

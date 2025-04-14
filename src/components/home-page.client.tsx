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
    setIsSidebarOpen(true);
    setShowCategories(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <AnimatePresence>
        <div
          className={cn("fixed left-0 top-0 overflow-hidden", {
            "w-[250px]": isSidebarOpen,
            "w-[80px]": isSidebarOpen === false,
          })}
        >
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      </AnimatePresence>
    </>
  );
};

export default HomePageClient;

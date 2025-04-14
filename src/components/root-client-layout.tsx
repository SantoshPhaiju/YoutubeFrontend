"use client";

import { NavbarContext } from "@/context/navbar-context";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Navbar from "./navbar";
import OverlaySidebar from "./sidebarcomponents/overlay-sidebar";

const RootClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showCategories, setShowCategories] = useState(true);
  const [showOverlaySidebar, setShowOverlaySidebar] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <NavbarContext.Provider
        value={{
          isSidebarOpen,
          setIsSidebarOpen,
          showCategories,
          setShowCategories,
        }}
      >
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          showCategories={showCategories}
          setShowOverlaySidebar={setShowOverlaySidebar}
        />
        <div>
          <main className="mt-[70px] gap-5">
            <OverlaySidebar
              setShowOverlaySidebar={setShowOverlaySidebar}
              showOverlaySidebar={showOverlaySidebar}
            />

            <div
              className={cn(`pl-[250px] `, {
                "pl-[90px]":
                  isSidebarOpen === false && !pathname.includes("/watch"),
                "pl-[0px]":
                  isSidebarOpen === false && pathname.includes("/watch"),
              })}
            >
              {children}
            </div>
          </main>
        </div>
      </NavbarContext.Provider>
    </>
  );
};

export default RootClientLayout;

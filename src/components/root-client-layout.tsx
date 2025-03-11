"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const RootClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div>
        <main className="mt-[70px] gap-5">
          <AnimatePresence>
            <motion.div
              animate={{
                x: isSidebarOpen ? "0%" : "-100%",
              }}
              transition={{
                type: "tween",
              }}
              className="fixed top-0 left-0"
            >
              <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
              />
            </motion.div>
          </AnimatePresence>
          <div
            className={cn(`pl-[250px] transition-all duration-300`, {
              "pl-0": isSidebarOpen === false,
            })}
          >
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default RootClientLayout;

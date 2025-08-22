"use client";

import { NavbarContext } from "@/context/navbar-context";
import { useContext, useEffect } from "react";

const ChannelPageClientLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setIsSidebarOpen, isSidebarOpen, setShowCategories, showCategories } =
    useContext(NavbarContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1290) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Run on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarOpen]);

  useEffect(() => {
    if (showCategories === true) {
      setShowCategories(false);
    }
  }, [isSidebarOpen, setIsSidebarOpen, showCategories, setShowCategories]);
  return <div>{children}</div>;
};

export default ChannelPageClientLayout;

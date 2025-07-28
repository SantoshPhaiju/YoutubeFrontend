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
    if (isSidebarOpen === false) {
      setIsSidebarOpen(true);
    }
    if (showCategories === true) {
      setShowCategories(false);
    }
  }, [isSidebarOpen, setIsSidebarOpen, showCategories, setShowCategories]);
  return <div>{children}</div>;
};

export default ChannelPageClientLayout;

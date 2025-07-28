"use client";

import { NavbarContext } from "@/context/navbar-context";
import { useContext, useEffect } from "react";

const ChannelPageClientLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setIsSidebarOpen, isSidebarOpen } = useContext(NavbarContext);
  useEffect(() => {
    if (isSidebarOpen === false) {
      setIsSidebarOpen(true);
    }
  }, [isSidebarOpen, setIsSidebarOpen]);
  return <div>{children}</div>;
};

export default ChannelPageClientLayout;

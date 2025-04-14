"use client";

import { NavbarContext } from "@/context/navbar-context";
import React, { useContext, useEffect } from "react";

const ClientVideoPageLayout = ({ children }: { children: React.ReactNode }) => {
  const { setIsSidebarOpen, setShowCategories } = useContext(NavbarContext);
  useEffect(() => {
    setIsSidebarOpen(false);
    setShowCategories(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className="py-4">{children}</div>;
};

export default ClientVideoPageLayout;

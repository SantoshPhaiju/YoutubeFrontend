"use client";

import { NavbarContext } from "@/context/navbar-context";
import { useContext, useEffect } from "react";

const HomePageClient = () => {
  const { setIsSidebarOpen, setShowCategories } = useContext(NavbarContext);
  useEffect(() => {
    setIsSidebarOpen(true);
    setShowCategories(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default HomePageClient;

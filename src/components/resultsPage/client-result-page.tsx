"use client";

import { NavbarContext } from "@/context/navbar-context";
import React, { useContext, useEffect } from "react";

const ClientResultsPage = ({ children }: { children: React.ReactNode }) => {
  const { setShowCategories } = useContext(NavbarContext);

  useEffect(() => {
    setShowCategories(false);
  }, []);
  return <div className="py-4">{children}</div>;
};

export default ClientResultsPage;

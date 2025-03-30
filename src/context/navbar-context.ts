import { createContext } from "react";

export const NavbarContext = createContext<{
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showCategories: boolean;
  setShowCategories: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
  showCategories: false,
  setShowCategories: () => {},
});

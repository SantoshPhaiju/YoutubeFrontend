"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaYoutube } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  MdOutlineSwitchAccount,
  MdOutlineVideoSettings,
  MdOutlineVisibilityOff,
} from "react-icons/md";

import AvatarComponent from "@/components/navbar/avatar-component";
import SigninModal from "@/components/navbar/signin-modal";
import useAuthStore from "@/store/authStore";
import { useState } from "react";
import {
  MdOutlineAccountCircle,
  MdOutlineDarkMode,
  MdOutlineHelpOutline,
  MdOutlineKeyboard,
  MdOutlineLanguage,
  MdOutlineLocationOn,
  MdOutlineLogout,
  MdOutlinePayments,
  MdOutlineSettings,
  MdOutlineShield,
} from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import CreateComponent from "./create/create-component";
import Search from "./search";
import SemiNav from "./semi-nav";

const menuItems = [
  { icon: MdOutlineDarkMode, label: "Appearance: Light" },
  { icon: MdOutlineLanguage, label: "Language: English" },
  { icon: MdOutlineLogout, label: "Sign out" },
  { icon: MdOutlineSwitchAccount, label: "Switch account" },
  { icon: MdOutlineVideoSettings, label: "YouTube Studio" },
  { icon: MdOutlinePayments, label: "Purchases and memberships" },
  { icon: MdOutlineShield, label: "Your data in YouTube" },
  { icon: MdOutlineVisibilityOff, label: "Restricted Mode: Off" },
  { icon: MdOutlineAccountCircle, label: "Google Account" },
  { icon: MdOutlineLocationOn, label: "Location: Nepal" },
  { icon: MdOutlineKeyboard, label: "Keyboard shortcuts" },
  { icon: MdOutlineSettings, label: "Settings" },
  { icon: MdOutlineHelpOutline, label: "Help" },
];

const Navbar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  showCategories,
  setShowOverlaySidebar,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  showCategories: boolean;
  setShowOverlaySidebar: (value: boolean) => void;
}) => {
  const pathname = usePathname();

  const [openDropdown, setOpenDropdown] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <>
      <header className="w-full select-none flex justify-between bg-white items-center fixed top-0 left-0 py-1.5 md:pb-3! pb-3! px-2 md:px-3.5 z-50 gap-4">
        <div className="logo select-none flex justify-center items-center gap-1 text-2xl font-semibold">
          <div
            // onClick={() => {
            //   if (!pathname.includes("/watch")) {
            //     setIsSidebarOpen(!isSidebarOpen);
            //   } else {
            //     setShowOverlaySidebar(true);
            //   }
            // }}
            onClick={() => {
              const isMobile = window.innerWidth < 1024; // Tailwind's md breakpoint

              if (!pathname.includes("/watch")) {
                if (isMobile) {
                  setShowOverlaySidebar(true);
                } else {
                  setIsSidebarOpen(!isSidebarOpen);
                }
              } else {
                setShowOverlaySidebar(true);
              }
            }}
            className="hamburger cursor-pointer p-2 sm:p-3 flex flex-col gap-[3px] justify-center items-center rounded-full hover:bg-gray-200"
          >
            <RxHamburgerMenu />
          </div>
          <FaYoutube className="text-3xl! text-red-500" />
          <Link
            href={"/"}
            className="text-[18px] -ml-1 font-roboto font-semibold lg:text-xl relative font-roboto-condensed"
          >
            SanTube{" "}
            <span className={"text-xs absolute -top-1 font-normal -right-4"}>
              NP
            </span>
          </Link>
        </div>
        <div className="flex justify-end gap-2 md:gap-4 items-center w-full">
          <div className="search w-full">
            <Search />
          </div>

          {isLoggedIn ? (
            <div className="profiles flex justify-center items-center gap-2 md:gap-4 ">
              <CreateComponent />
              <div className="cursor-pointer relative hover:bg-gray-200 p-2 rounded-full">
                <IoMdNotificationsOutline className="text-[28px] cursor-pointer" />
                <div className="absolute top-0.5 right-0.5 w-4.5 h-4.5 rounded-full bg-red-500 text-white text-[10px] flex justify-center items-center">
                  7
                </div>
              </div>
              <div className="cursor-pointer">
                <AvatarComponent
                  menuItems={menuItems}
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                />
              </div>
            </div>
          ) : (
            <div className="profiles flex justify-center items-center gap-2 md:gap-4 ">
              <SigninModal />
            </div>
          )}
        </div>
      </header>
      {showCategories && (
        <div
          className={cn(
            `sticky z-40 top-[65px] flex justify-center items-center pt-5 bg-white ml-[250px] left-[250px]`,
            {
              "ml-0 md:ml-[90px]": isSidebarOpen === false,
            },
          )}
        >
          {/* {showCategories && <SemiNav />} */}
          <SemiNav />
        </div>
      )}
    </>
  );
};

export default Navbar;

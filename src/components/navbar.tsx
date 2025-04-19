"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaYoutube } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  MdOutlineSwitchAccount,
  MdOutlineVideoSettings,
  MdOutlineVisibilityOff,
} from "react-icons/md";

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
import Search from "./search";
import SemiNav from "./semi-nav";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const menuItems = [
  { icon: MdOutlineAccountCircle, label: "Google Account" },
  { icon: MdOutlineSwitchAccount, label: "Switch account" },
  { icon: MdOutlineLogout, label: "Sign out" },
  { icon: MdOutlineVideoSettings, label: "YouTube Studio" },
  { icon: MdOutlinePayments, label: "Purchases and memberships" },
  { icon: MdOutlineShield, label: "Your data in YouTube" },
  { icon: MdOutlineDarkMode, label: "Appearance: Light" },
  { icon: MdOutlineLanguage, label: "Language: English" },
  { icon: MdOutlineVisibilityOff, label: "Restricted Mode: Off" },
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
  console.log("pathname", pathname);
  return (
    <>
      <header className="w-full flex justify-between bg-white items-center fixed top-0 left-0 py-2 px-4 z-40">
        <div className="logo select-none flex justify-center items-center gap-1 text-2xl font-semibold">
          <div
            onClick={() => {
              if (!pathname.includes("/watch")) {
                setIsSidebarOpen(!isSidebarOpen);
              } else {
                setShowOverlaySidebar(true);
              }
            }}
            className="hamburger mr-2 cursor-pointer p-3 flex flex-col gap-[3px] justify-center items-center rounded-full hover:bg-gray-200"
          >
            <RxHamburgerMenu />
          </div>
          <FaYoutube className="text-[24px] text-red-700" />
          <Link href={"/"} className="text-[24px]">
            MyTube
          </Link>
        </div>
        <div className="search">
          <Search />
        </div>
        <div className="profiles flex justify-center items-center gap-4 ">
          <div className="">
            <Button
              className="flex justify-center items-center gap-2 text-red-700 text-md rounded-full bg-gray-50 hover:bg-gray-100"
              variant={"outline"}
            >
              <FaPlus />
              Create
            </Button>
          </div>
          <div>
            <IoMdNotificationsOutline className="text-[24px] cursor-pointer" />
          </div>
          <div className="cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white h-auto max-h-[90vh] mr-8 mt-2 px-0 rounded-xl w-[290px] py-0">
                <DropdownMenuLabel className="sticky top-0 left-0 z-50 gap-3 w-full flex justify-start items-start px-4 py-3 pt-4 bg-white">
                  <div className="">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <div className="text-[18px] font-roboto font-medium">
                      Santosh Phaiju
                    </div>
                    <div className="text-[14px] font-normal font-sans">
                      @santoshphaiju212
                    </div>
                    <Link
                      href={"/"}
                      className="text-blue-600 hover:underline underline-offset-4 font-normal mt-[4px]"
                    >
                      View your channel
                    </Link>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-300" />
                <div className="pb-2">
                  {menuItems.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      className="text-md w-full py-3 px-5 flex justify-start items-center gap-3 cursor-pointer"
                    >
                      <div className="text-[18px]">
                        <item.icon />
                      </div>
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  ))}
                </div>
                {/* <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      {showCategories && (
        <div
          className={cn(
            `sticky z-50 top-[57px] flex justify-center items-center pt-5 bg-white ml-[250px] left-[250px] transition-all duration-300 `,
            {
              "ml-[90px]": isSidebarOpen === false,
            }
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

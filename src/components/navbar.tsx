"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaYoutube } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import Search from "./search";
import SemiNav from "./semi-nav";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

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
            <Avatar >
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
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

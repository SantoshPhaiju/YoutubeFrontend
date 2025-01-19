import { FaYoutube } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import Search from "./search";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="w-full flex justify-between bg-white items-center fixed top-0 left-0 py-1 px-4 border-b z-50">
      <div className="logo select-none flex justify-center items-center gap-1 text-2xl font-semibold">
        <div className="hamburger mr-2 cursor-pointer p-3 flex flex-col gap-[3px] justify-center items-center rounded-full hover:bg-gray-200">
          <RxHamburgerMenu />
        </div>
        <FaYoutube className="text-[24px] text-red-700" />
        <div className="text-[18px]">MyTube</div>
      </div>
      <div className="search">
        <Search />
      </div>
      <div className="profiles flex justify-center items-center gap-4 ">
        <div className="">
          <Button
            className="flex justify-center items-center gap-2 text-red-700 text-md rounded-full"
            variant={"outline"}
          >
            <FaPlus />
            Create
          </Button>
        </div>
        <div>
          <IoMdNotificationsOutline className="text-[30px] cursor-pointer" />
        </div>
        <div className="cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

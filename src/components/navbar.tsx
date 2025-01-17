import { FaYoutube } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdNotificationsOutline } from "react-icons/io";
import Search from "./search";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="w-full flex justify-between bg-white items-center fixed top-0 left-0 p-4 border-b z-50">
      <div className="logo select-none flex justify-center items-center gap-1 text-2xl font-semibold text-red-700">
        <div className="hamburger mr-4 cursor-pointer">
          <GiHamburgerMenu />
        </div>
        <FaYoutube className="text-[24px]" />
        MyTube
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
          <IoMdNotificationsOutline className="text-[30px]" />
        </div>
        <div>
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

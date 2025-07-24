"use client";

import { BsBroadcast } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { GoVideo } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const CreateComponent = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex px-3 sm:px-4 justify-center items-center gap-1 md:gap-2 text-red-700 text-sm md:text-md rounded-full bg-gray-50 hover:bg-gray-100 select-none"
            variant={"outline"}
          >
            <FaPlus />
            Create
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="px-0 py-2 min-w-[170px] rounded-[8px] mr-4">
          <DropdownMenuGroup>
            <DropdownMenuItem className="hover:!bg-gray-300/50 px-3 cursor-pointer py-2">
              <div className="flex justify-start items-center gap-3">
                <GoVideo size={18} />
                <span>Upload Video</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:!bg-gray-300/50 px-3 cursor-pointer py-2">
              <div className="flex justify-start items-center gap-3">
                <BsBroadcast size={18} />
                <span>Go Live</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:!bg-gray-300/50 px-3 cursor-pointer py-2">
              <div className="flex justify-start items-center gap-3">
                <IoCreateOutline size={18} />
                <span>Create Post</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CreateComponent;

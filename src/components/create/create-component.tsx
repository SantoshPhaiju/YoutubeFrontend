"use client";

import UploadVideoForm from "@/components/create/UploadVideoForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openUploadVideo, setOpenUploadVideo] = useState<boolean>(false);
  return (
    <div>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex px-2 sm:px-4 justify-center items-center gap-1 md:gap-2 text-red-700 text-sm md:text-md rounded-full bg-gray-100 hover:bg-gray-200 select-none cursor-pointer shadow-none border border-gray-300"
            variant={"outline"}
          >
            <FaPlus size={28} className="h-8 w-8" />
            <span className="">Create</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="px-0 py-2 min-w-[170px] rounded-[8px] mr-4">
          <DropdownMenuGroup>
            <DropdownMenuItem className="hover:bg-gray-300/50! px-3 cursor-pointer py-2">
              <div
                onClick={() => {
                  setOpenUploadVideo(true);
                  setDropdownOpen(false);
                }}
                className="flex justify-start items-center gap-3"
              >
                <GoVideo size={18} />
                <span>Upload Video</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-300/50! px-3 cursor-pointer py-2">
              <div className="flex justify-start items-center gap-3">
                <BsBroadcast size={18} />
                <span>Go Live</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-300/50! px-3 cursor-pointer py-2">
              <div className="flex justify-start items-center gap-3">
                <IoCreateOutline size={18} />
                <span>Create Post</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openUploadVideo} onOpenChange={setOpenUploadVideo}>
        <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload Video</DialogTitle>
            <DialogDescription className={"hidden"}>
              Upload video dialog
            </DialogDescription>
          </DialogHeader>

          <UploadVideoForm onClose={() => setOpenUploadVideo(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateComponent;

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
import { GoVideo } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import { RiAddLargeLine } from "react-icons/ri";
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
            className="flex px-2 md:px-3 py-2! h-full! justify-center items-center gap-1 md:gap-2 text-red-700 text-sm md:text-md rounded-full bg-slate-100 hover:bg-gray-200 select-none cursor-pointer shadow-none border border-gray-200"
            variant={"outline"}
          >
            {/* <FaPlus className="h-6! w-6!" /> */}
            <RiAddLargeLine className="h-5! w-5! text-black!" />
            <span className="font-medium">Create</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="px-0 py-2 min-w-42.5 rounded-lg mr-4">
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

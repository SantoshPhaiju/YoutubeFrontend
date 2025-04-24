"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const CommentComponent = () => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  return (
    <>
      <div className="commentSection ">
        <div className="large hidden xl:flex flex-col gap-4 h-auto mb-4 mt-4 w-full">
          <h1 className="font-semibold text-[20px]">621 Comments</h1>
          <div className="addComment flex gap-4 w-full items-start">
            <div className="w-[40px] h-[40px] z-0">
              <Avatar className="">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="rounded-[50%] z-0"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="w-full flex flex-col gap-2">
              <input
                type="text"
                name="comment"
                id="comment"
                placeholder="Add a comment..."
                className="w-full transition-all duration-300 border-b-2 border-gray-300 text-md py-[4px] outline-none focus:outline-none focus:border-black"
              />
              <div className="flex justify-end gap-2 items-center">
                <Button
                  variant={"ghost"}
                  className="text-sm font-semibold rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  variant={"default"}
                  className="text-sm font-semibold rounded-full bg-gray-200 text-black hover:bg-gray-300"
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
          <div className="comments flex flex-col gap-4 w-full">
            <div className="comment flex gap-3 w-full">
              <div className="w-[40px] h-[40px] z-0">
                <Avatar className="">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-[50%] z-0"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="flex gap-1 items-center justify-start">
                  <div className="text-gray-800 text-sm font-[600]">
                    @santoshphaiju321
                  </div>
                  <div className="text-gray-600 text-[12px] font-normal">
                    3 years ago
                  </div>
                </div>
                <div>
                  Arijit singh my favourite singer❤ A- Aayat B- Binte dil
                </div>
                <div className="flex justify-start gap-4 items-center mt-2 text-md">
                  <div className="likes flex justify-start items-center gap-2">
                    <div className="flex justify-center items-center gap-1">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiLike size={18} className="" />
                      </div>
                      <p className="font-sans font-semibold text-sm">4K</p>
                    </div>
                    <div className="">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiDislike size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="reply">Reply</div>
                </div>
                <div className="flex justify-start gap-1 items-center mt-2 text-sm text-blue-600 font-medium cursor-pointer hover:bg-blue-100 transition-all duration-300 py-2 px-2 rounded-full w-[120px] selectnone mb-1 text-center">
                  <div>
                    <MdKeyboardArrowDown size={24} />
                  </div>
                  <div>48 replies</div>
                </div>
              </div>
            </div>
            <div className="comment flex gap-3 w-full">
              <div className="w-[40px] h-[40px] z-0">
                <Avatar className="">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-[50%] z-0"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="flex gap-1 items-center justify-start">
                  <div className="text-gray-800 text-sm font-semibold">
                    @santoshphaiju321
                  </div>
                  <div className="text-gray-600 text-[12px] font-normal">
                    3 years ago
                  </div>
                </div>
                <div>
                  Arijit singh my favourite singer❤ A- Aayat B- Binte dil
                </div>
                <div className="flex justify-start gap-4 items-center mt-2 text-md">
                  <div className="likes flex justify-start items-center gap-2">
                    <div className="flex justify-center items-center gap-1">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiLike size={18} className="" />
                      </div>
                      <p className="font-sans font-semibold text-sm">4K</p>
                    </div>
                    <div className="">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiDislike size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="reply">Reply</div>
                </div>
                <div className="flex justify-start gap-1 items-center mt-2 text-sm text-blue-600 font-medium cursor-pointer hover:bg-blue-100 transition-all duration-300 py-2 px-4 rounded-full w-[130px] selectnone mb-1">
                  <div>
                    <MdKeyboardArrowDown size={24} />
                  </div>
                  <div>48 replies</div>
                </div>
              </div>
            </div>
            <div className="comment flex gap-3 w-full">
              <div className="w-[40px] h-[40px] z-0">
                <Avatar className="">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-[50%] z-0"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="flex gap-1 items-center justify-start">
                  <div className="text-gray-800 text-sm font-semibold">
                    @santoshphaiju321
                  </div>
                  <div className="text-gray-600 text-[12px] font-normal">
                    3 years ago
                  </div>
                </div>
                <div>
                  Arijit singh my favourite singer❤ A- Aayat B- Binte dil
                </div>
                <div className="flex justify-start gap-4 items-center mt-2 text-md">
                  <div className="likes flex justify-start items-center gap-2">
                    <div className="flex justify-center items-center gap-1">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiLike size={18} className="" />
                      </div>
                      <p className="font-sans font-semibold text-sm">4K</p>
                    </div>
                    <div className="">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiDislike size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="reply">Reply</div>
                </div>
                <div className="flex justify-start gap-1 items-center mt-2 text-sm text-blue-600 font-medium cursor-pointer hover:bg-blue-100 transition-all duration-300 py-2 px-4 rounded-full w-[130px] selectnone mb-1">
                  <div>
                    <MdKeyboardArrowDown size={24} />
                  </div>
                  <div>48 replies</div>
                </div>
              </div>
            </div>
            <div className="comment flex gap-3 w-full">
              <div className="w-[40px] h-[40px] z-0">
                <Avatar className="">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-[50%] z-0"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="flex gap-1 items-center justify-start">
                  <div className="text-gray-800 text-sm font-semibold">
                    @santoshphaiju321
                  </div>
                  <div className="text-gray-600 text-[12px] font-normal">
                    3 years ago
                  </div>
                </div>
                <div>
                  Arijit singh my favourite singer❤ A- Aayat B- Binte dil
                </div>
                <div className="flex justify-start gap-4 items-center mt-2 text-md">
                  <div className="likes flex justify-start items-center gap-2">
                    <div className="flex justify-center items-center gap-1">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiLike size={18} className="" />
                      </div>
                      <p className="font-sans font-semibold text-sm">4K</p>
                    </div>
                    <div className="">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiDislike size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="reply">Reply</div>
                </div>
                <div className="flex justify-start gap-1 items-center mt-2 text-sm text-blue-600 font-medium cursor-pointer hover:bg-blue-100 transition-all duration-300 py-2 px-4 rounded-full w-[130px] selectnone mb-1">
                  <div>
                    <MdKeyboardArrowDown size={24} />
                  </div>
                  <div>48 replies</div>
                </div>
              </div>
            </div>
            <div className="comment flex gap-3 w-full">
              <div className="w-[40px] h-[40px] z-0">
                <Avatar className="">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-[50%] z-0"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="flex gap-1 items-center justify-start">
                  <div className="text-gray-800 text-sm font-semibold">
                    @santoshphaiju321
                  </div>
                  <div className="text-gray-600 text-[12px] font-normal">
                    3 years ago
                  </div>
                </div>
                <div>
                  Arijit singh my favourite singer❤ A- Aayat B- Binte dil
                </div>
                <div className="flex justify-start gap-4 items-center mt-2 text-md">
                  <div className="likes flex justify-start items-center gap-2">
                    <div className="flex justify-center items-center gap-1">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiLike size={18} className="" />
                      </div>
                      <p className="font-sans font-semibold text-sm">4K</p>
                    </div>
                    <div className="">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiDislike size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="reply">Reply</div>
                </div>
                <div className="flex justify-start gap-1 items-center mt-2 text-sm text-blue-600 font-medium cursor-pointer hover:bg-blue-100 transition-all duration-300 py-2 px-4 rounded-full w-[130px] selectnone mb-1">
                  <div>
                    <MdKeyboardArrowDown size={24} />
                  </div>
                  <div>48 replies</div>
                </div>
              </div>
            </div>
            <div className="comment flex gap-3 w-full">
              <div className="w-[40px] h-[40px] z-0">
                <Avatar className="">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-[50%] z-0"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="flex gap-1 items-center justify-start">
                  <div className="text-gray-800 text-sm font-semibold">
                    @santoshphaiju321
                  </div>
                  <div className="text-gray-600 text-[12px] font-normal">
                    3 years ago
                  </div>
                </div>
                <div>
                  Arijit singh my favourite singer❤ A- Aayat B- Binte dil
                </div>
                <div className="flex justify-start gap-4 items-center mt-2 text-md">
                  <div className="likes flex justify-start items-center gap-2">
                    <div className="flex justify-center items-center gap-1">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiLike size={18} className="" />
                      </div>
                      <p className="font-sans font-semibold text-sm">4K</p>
                    </div>
                    <div className="">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiDislike size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="reply">Reply</div>
                </div>
                <div className="flex justify-start gap-1 items-center mt-2 text-sm text-blue-600 font-medium cursor-pointer hover:bg-blue-100 transition-all duration-300 py-2 px-4 rounded-full w-[130px] selectnone mb-1">
                  <div>
                    <MdKeyboardArrowDown size={24} />
                  </div>
                  <div>48 replies</div>
                </div>
              </div>
            </div>
            <div className="comment flex gap-3 w-full">
              <div className="w-[40px] h-[40px] z-0">
                <Avatar className="">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-[50%] z-0"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="flex gap-1 items-center justify-start">
                  <div className="text-gray-800 text-sm font-semibold">
                    @santoshphaiju321
                  </div>
                  <div className="text-gray-600 text-[12px] font-normal">
                    3 years ago
                  </div>
                </div>
                <div>
                  Arijit singh my favourite singer❤ A- Aayat B- Binte dil
                </div>
                <div className="flex justify-start gap-4 items-center mt-2 text-md">
                  <div className="likes flex justify-start items-center gap-2">
                    <div className="flex justify-center items-center gap-1">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiLike size={18} className="" />
                      </div>
                      <p className="font-sans font-semibold text-sm">4K</p>
                    </div>
                    <div className="">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiDislike size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="reply">Reply</div>
                </div>
                <div className="flex justify-start gap-1 items-center mt-2 text-sm text-blue-600 font-medium cursor-pointer hover:bg-blue-100 transition-all duration-300 py-2 px-4 rounded-full w-[130px] selectnone mb-1">
                  <div>
                    <MdKeyboardArrowDown size={24} />
                  </div>
                  <div>48 replies</div>
                </div>
              </div>
            </div>
            <div className="comment flex gap-3 w-full">
              <div className="w-[40px] h-[40px] z-0">
                <Avatar className="">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-[50%] z-0"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="flex gap-1 items-center justify-start">
                  <div className="text-gray-800 text-sm font-semibold">
                    @santoshphaiju321
                  </div>
                  <div className="text-gray-600 text-[12px] font-normal">
                    3 years ago
                  </div>
                </div>
                <div>
                  Arijit singh my favourite singer❤ A- Aayat B- Binte dil
                </div>
                <div className="flex justify-start gap-4 items-center mt-2 text-md">
                  <div className="likes flex justify-start items-center gap-2">
                    <div className="flex justify-center items-center gap-1">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiLike size={18} className="" />
                      </div>
                      <p className="font-sans font-semibold text-sm">4K</p>
                    </div>
                    <div className="">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiDislike size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="reply">Reply</div>
                </div>
                <div className="flex justify-start gap-1 items-center mt-2 text-sm text-blue-600 font-medium cursor-pointer hover:bg-blue-100 transition-all duration-300 py-2 px-4 rounded-full w-[130px] selectnone mb-1">
                  <div>
                    <MdKeyboardArrowDown size={24} />
                  </div>
                  <div>48 replies</div>
                </div>
              </div>
            </div>
            <div className="comment flex gap-3 w-full">
              <div className="w-[40px] h-[40px] z-0">
                <Avatar className="">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-[50%] z-0"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="flex gap-1 items-center justify-start">
                  <div className="text-gray-800 text-sm font-semibold">
                    @santoshphaiju321
                  </div>
                  <div className="text-gray-600 text-[12px] font-normal">
                    3 years ago
                  </div>
                </div>
                <div>
                  Arijit singh my favourite singer❤ A- Aayat B- Binte dil
                </div>
                <div className="flex justify-start gap-4 items-center mt-2 text-md">
                  <div className="likes flex justify-start items-center gap-2">
                    <div className="flex justify-center items-center gap-1">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiLike size={18} className="" />
                      </div>
                      <p className="font-sans font-semibold text-sm">4K</p>
                    </div>
                    <div className="">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiDislike size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="reply">Reply</div>
                </div>
                <div className="flex justify-start gap-1 items-center mt-2 text-sm text-blue-600 font-medium cursor-pointer hover:bg-blue-100 transition-all duration-300 py-2 px-4 rounded-full w-[130px] selectnone mb-1">
                  <div>
                    <MdKeyboardArrowDown size={24} />
                  </div>
                  <div>48 replies</div>
                </div>
              </div>
            </div>
            <div className="comment flex gap-3 w-full">
              <div className="w-[40px] h-[40px] z-0">
                <Avatar className="">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-[50%] z-0"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="flex gap-1 items-center justify-start">
                  <div className="text-gray-800 text-sm font-semibold">
                    @santoshphaiju321
                  </div>
                  <div className="text-gray-600 text-[12px] font-normal">
                    3 years ago
                  </div>
                </div>
                <div>
                  Arijit singh my favourite singer❤ A- Aayat B- Binte dil
                </div>
                <div className="flex justify-start gap-4 items-center mt-2 text-md">
                  <div className="likes flex justify-start items-center gap-2">
                    <div className="flex justify-center items-center gap-1">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiLike size={18} className="" />
                      </div>
                      <p className="font-sans font-semibold text-sm">4K</p>
                    </div>
                    <div className="">
                      <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                        <BiDislike size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="reply">Reply</div>
                </div>
                <div className="flex justify-start gap-1 items-center mt-2 text-sm text-blue-600 font-medium cursor-pointer hover:bg-blue-100 transition-all duration-300 py-2 px-4 rounded-full w-[130px] selectnone mb-1">
                  <div>
                    <MdKeyboardArrowDown size={24} />
                  </div>
                  <div>48 replies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            setShowCommentModal(true);
          }}
          className="small xl:hidden flex flex-col gap-4 h-auto mb-4 mt-4 w-full"
        >
          <div className="w-full flex flex-col gap-4 h-auto bg-gray-50 hover:bg-gray-100 transition-all duration-300 rounded-lg px-4 py-2 pb-4">
            <div className="heading flex justify-start items-start gap-2">
              <div className="font-semibold text-[16px]">Comments</div>
              <div className="font-medium opacity-80 text-[15px]">{27}</div>
            </div>
            <div className="addComment">
              <div className="addComment flex gap-4 w-full items-start">
                <div className="w-[34px] h-[34px] overflow-hidden z-0">
                  <Avatar className=" w-full h-full">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="rounded-[50%] h-full w-full z-0"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="w-[90%] flex flex-col gap-2">
                  <input
                    type="text"
                    name="comment"
                    id="comment"
                    onClick={() => {
                      setShowCommentModal(true);
                    }}
                    placeholder="Add a comment..."
                    className="w-full transition-all duration-300 border-b-2 border-gray-300 text-md py-[4px] outline-none focus:outline-none focus:border-black bg-transparent cursor-default"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCommentModal === true && (
          <motion.div
            initial={{ y: "200%" }}
            animate={{ y: 0 }}
            exit={{ y: "200%" }}
            transition={{ duration: 0.3 }}
            className={cn(
              `commentsModal z-50 bg-gray-50 rounded-t-2xl shadow-xl w-full h-[62%] border-t border-r border-l border-black/20 fixed bottom-0 left-0 overflow-y-auto`
            )}
          >
            <div className="comments relative">
              <div className="addcommentsection px-6 py-4 bg-white rounded-t-2xl border-t border-gray-100 fixed bottom-0 left-0 w-full z-50">
                <div className="addComment flex flex-col gap-2">
                  <div className="flex gap-4 w-full items-start">
                    <div className="w-[34px] h-[34px] overflow-hidden z-0">
                      <Avatar className=" w-full h-full">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                          className="rounded-[50%] h-full w-full z-0"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="w-[90%] flex flex-col gap-2">
                      <input
                        type="text"
                        name="comment"
                        id="comment"
                        placeholder="Add a comment..."
                        className="w-full transition-all duration-300 border-b-2 border-gray-300 text-md py-[4px] outline-none focus:outline-none focus:border-black bg-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 items-center">
                    <Button
                      variant={"ghost"}
                      className="text-sm font-semibold rounded-full"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant={"default"}
                      className="text-sm font-semibold rounded-full bg-gray-200 text-black hover:bg-gray-300"
                    >
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
              <div className="heading sticky top-0 left-0 bg-gray-50 z-30 px-6 py-4 border-b border-gray-300 flex-col text-lg font-medium flex justify-center items-start gap-2">
                <div className="flex justify-between items-center w-full">
                  <div>Comments</div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowCommentModal(false)}
                  >
                    <IoMdClose />
                  </div>
                </div>
                <div className="filters flex gap-2 items-center justify-start">
                  <Button size={"sm"} variant={"default"} className="py-1 ">
                    Top
                  </Button>
                  <Button size={"sm"} variant={"secondary"} className="py-1">
                    Newest
                  </Button>
                </div>
              </div>
              <div className="comments pb-16">
                <div className="comments flex flex-col gap-4 w-full py-4 px-6">
                  <div className="comment flex gap-3 w-full">
                    <div className="w-[40px] h-[40px] z-0">
                      <Avatar className="">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                          className="rounded-[50%] z-0"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <div className="flex gap-1 items-center justify-start">
                        <div className="text-gray-800 text-sm font-[600]">
                          @santoshphaiju321
                        </div>
                        <div className="text-gray-600 text-[12px] font-normal">
                          3 years ago
                        </div>
                      </div>
                      <div>
                        Arijit singh my favourite singer❤ A- Aayat B- Binte dil
                      </div>
                      <div className="flex justify-start gap-4 items-center mt-2 text-md">
                        <div className="likes flex justify-start items-center gap-2">
                          <div className="flex justify-center items-center gap-1">
                            <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                              <BiLike size={18} className="" />
                            </div>
                            <p className="font-sans font-semibold text-sm">
                              4K
                            </p>
                          </div>
                          <div className="">
                            <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                              <BiDislike size={18} />
                            </div>
                          </div>
                        </div>
                        <div className="reply">Reply</div>
                      </div>
                      <div className="flex justify-start gap-1 items-center mt-2 text-sm text-blue-600 font-medium cursor-pointer hover:bg-blue-100 transition-all duration-300 py-2 px-2 rounded-full w-[120px] selectnone mb-1 text-center">
                        <div>
                          <MdKeyboardArrowDown size={24} />
                        </div>
                        <div>48 replies</div>
                      </div>
                    </div>
                  </div>
                  <div className="comment flex gap-3 w-full">
                    <div className="w-[40px] h-[40px] z-0">
                      <Avatar className="">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                          className="rounded-[50%] z-0"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <div className="flex gap-1 items-center justify-start">
                        <div className="text-gray-800 text-sm font-semibold">
                          @santoshphaiju321
                        </div>
                        <div className="text-gray-600 text-[12px] font-normal">
                          3 years ago
                        </div>
                      </div>
                      <div>
                        Arijit singh my favourite singer❤ A- Aayat B- Binte dil
                      </div>
                      <div className="flex justify-start gap-4 items-center mt-2 text-md">
                        <div className="likes flex justify-start items-center gap-2">
                          <div className="flex justify-center items-center gap-1">
                            <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                              <BiLike size={18} className="" />
                            </div>
                            <p className="font-sans font-semibold text-sm">
                              4K
                            </p>
                          </div>
                          <div className="">
                            <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                              <BiDislike size={18} />
                            </div>
                          </div>
                        </div>
                        <div className="reply">Reply</div>
                      </div>
                      <div className="flex justify-start gap-1 items-center mt-2 text-sm text-blue-600 font-medium cursor-pointer hover:bg-blue-100 transition-all duration-300 py-2 px-4 rounded-full w-[130px] selectnone mb-1">
                        <div>
                          <MdKeyboardArrowDown size={24} />
                        </div>
                        <div>48 replies</div>
                      </div>
                    </div>
                  </div>
                  <div className="comment flex gap-3 w-full">
                    <div className="w-[40px] h-[40px] z-0">
                      <Avatar className="">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                          className="rounded-[50%] z-0"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <div className="flex gap-1 items-center justify-start">
                        <div className="text-gray-800 text-sm font-semibold">
                          @santoshphaiju321
                        </div>
                        <div className="text-gray-600 text-[12px] font-normal">
                          3 years ago
                        </div>
                      </div>
                      <div>
                        Arijit singh my favourite singer❤ A- Aayat B- Binte dil
                      </div>
                      <div className="flex justify-start gap-4 items-center mt-2 text-md">
                        <div className="likes flex justify-start items-center gap-2">
                          <div className="flex justify-center items-center gap-1">
                            <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                              <BiLike size={18} className="" />
                            </div>
                            <p className="font-sans font-semibold text-sm">
                              4K
                            </p>
                          </div>
                          <div className="">
                            <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                              <BiDislike size={18} />
                            </div>
                          </div>
                        </div>
                        <div className="reply">Reply</div>
                      </div>
                      <div className="flex justify-start gap-1 items-center mt-2 text-sm text-blue-600 font-medium cursor-pointer hover:bg-blue-100 transition-all duration-300 py-2 px-4 rounded-full w-[130px] selectnone mb-1">
                        <div>
                          <MdKeyboardArrowDown size={24} />
                        </div>
                        <div>48 replies</div>
                      </div>
                    </div>
                  </div>
                  <div className="comment flex gap-3 w-full">
                    <div className="w-[40px] h-[40px] z-0">
                      <Avatar className="">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                          className="rounded-[50%] z-0"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <div className="flex gap-1 items-center justify-start">
                        <div className="text-gray-800 text-sm font-semibold">
                          @santoshphaiju321
                        </div>
                        <div className="text-gray-600 text-[12px] font-normal">
                          3 years ago
                        </div>
                      </div>
                      <div>
                        Arijit singh my favourite singer❤ A- Aayat B- Binte dil
                      </div>
                      <div className="flex justify-start gap-4 items-center mt-2 text-md">
                        <div className="likes flex justify-start items-center gap-2">
                          <div className="flex justify-center items-center gap-1">
                            <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                              <BiLike size={18} className="" />
                            </div>
                            <p className="font-sans font-semibold text-sm">
                              4K
                            </p>
                          </div>
                          <div className="">
                            <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                              <BiDislike size={18} />
                            </div>
                          </div>
                        </div>
                        <div className="reply">Reply</div>
                      </div>
                      <div className="flex justify-start gap-1 items-center mt-2 text-sm text-blue-600 font-medium cursor-pointer hover:bg-blue-100 transition-all duration-300 py-2 px-4 rounded-full w-[130px] selectnone mb-1">
                        <div>
                          <MdKeyboardArrowDown size={24} />
                        </div>
                        <div>48 replies</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommentComponent;

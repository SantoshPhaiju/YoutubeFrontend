import SemiNav from "@/components/semi-nav";
import SemiVideo from "@/components/semiVideoComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ClientVideoPageLayout from "@/components/video/client-vidoepage-layout";
import Image from "next/image";
import { BiDislike, BiLike } from "react-icons/bi";
import { FiBookmark } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiShareFatLight } from "react-icons/pi";

interface WatchPageProps {
  searchParams: {
    v?: string; // Query parameter (optional because it might be missing)
  };
}

const Page = async ({ searchParams }: WatchPageProps) => {
  const videoId = (await searchParams).v;

  if (!videoId) {
    return <p>Invalid video ID</p>;
  }

  const desc =
    "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.";
  const videoDescription = desc.repeat(10);

  console.log(`Loading video: ${videoId}`);

  return (
    <>
      <ClientVideoPageLayout>
        <div className="px-[64px] pb-2 z-0">
          {/* <Videopage /> */}
          <div className="w-full px-2 mx-auto h-auto cursor-pointer flex justify-center items-start gap-6">
            <div className="leftContainer w-full flex flex-col gap-3">
              <div className="videoPlayer w-full rounded-xl overflow-hidden">
                <Image
                  src={"/assets/thumb.jpg"}
                  height={200}
                  width={300}
                  className="h-[70vh] w-[100%] object-cover"
                  alt="VideoComponent"
                />
              </div>
              <div className="videoDetails flex flex-col gap-3">
                <div className="text-xl font-bold leading-tight">
                  Mitwa - Lyrical Song | KANK | Shahrukh Khan, Rani Mukherjee |
                  Shankar Ehsaan Loy | Romantic Song
                </div>
                <div className="flex justify-between">
                  <div className="channel flex gap-5 items-center">
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
                    <div className="flex flex-col">
                      <div className="text-lg font-semibold leading-tight font-roboto">
                        Santosh Phaiju
                      </div>
                      <div className="text-[12px] text-gray-600">
                        100K subscribers
                      </div>
                    </div>
                    <Button
                      variant="default"
                      className="rounded-full font-roboto font-medium"
                    >
                      Subscribe
                    </Button>
                  </div>
                  <div className="flex justify-end gap-2 items-center ">
                    <div className="flex justify-between items-center rounded-full bg-gray-100">
                      <div className="flex justify-center border-r items-center rounded-l-full gap-2 p-2 px-4 hover:bg-gray-200">
                        <BiLike size={20} />
                        <p className="font-sans font-semibold text-sm">4K</p>
                      </div>
                      <div className="p-2 px-4 rounded-r-full hover:bg-gray-200">
                        <BiDislike size={20} />
                      </div>
                    </div>
                    <div className="flex justify-center bg-gray-100 items-center rounded-full gap-2 p-2 px-4 hover:bg-gray-200">
                      <PiShareFatLight size={20} />
                      <p className="font-sans font-semibold text-sm">Share</p>
                    </div>
                    <div className="flex justify-center bg-gray-100 items-center rounded-full gap-2 p-2 px-4 hover:bg-gray-200">
                      <FiBookmark size={20} />
                      <p className="font-sans font-semibold text-sm">Save</p>
                    </div>
                    <Button className="rounded-full px-3 bg-gray-100 hover:bg-gray-200 flex justify-center gap-[2px] items-center">
                      <div className="bg-gray-700 h-1 w-1 rounded-full"></div>
                      <div className="bg-gray-700 h-1 w-1 rounded-full"></div>
                      <div className="bg-gray-700 h-1 w-1 rounded-full"></div>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="descriptionSection flex flex-col gap-2 py-[12px] px-[12px] h-auto w-full bg-gray-100 rounded-xl">
                <div className="flex justify-start items-center gap-2 font-semibold text-sm font-roboto">
                  <div>109, 447 views</div>
                  <div>Feb 6, 2025</div>
                </div>
                <div className="description text-[14px] font-normal font-roboto text-gray-800 leading-normal">
                  {videoDescription.substring(0, 200) + "..."}{" "}
                  <span className="text-blue-500 underline underline-offset-2 cursor-pointer">
                    see more
                  </span>
                </div>
              </div>
              <div className="commentSection flex flex-col gap-4 h-auto mb-4 mt-4 w-full">
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
            <div className="rightContainer w-[380px]">
              <SemiNav />
              <SemiVideo />
              <SemiVideo />
              <SemiVideo />
              <SemiVideo />
            </div>
          </div>
        </div>
      </ClientVideoPageLayout>
    </>
  );
};

export default Page;

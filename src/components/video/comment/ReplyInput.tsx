'use client';

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import useUserStore, {User} from "@/store/userStore";
import React, {useState} from "react";
import {Badge} from "@/components/ui/badge";
import {useReplyToCommentMutation} from "@/services/mutations/commentMutation";
import {toast} from "sonner";
import {useCommentReplyData} from "@/services/queries/commentQuery";

const ReplyInput = ({
                        setShowReply,
                        comment,
                        handleReply,
    reply,
    setReply,
                    }: {
    setShowReply: React.Dispatch<React.SetStateAction<string>>,
    comment: any,
    handleReply: (e: any) => Promise<void>,
    reply: string,
    setReply: React.Dispatch<React.SetStateAction<string>>,
}) => {
    const userData: User | null = useUserStore((state) => state.user);
    // const [reply, setReply] = useState("");
    const commentAuthor = comment?.author;




    return (
        <>
            <div className={"flex gap-2 w-full mt-2"}>
                <div>
                    <Avatar className="w-6 h-6 mt-1">
                        <AvatarImage
                            src={userData?.avatar}
                            alt={userData?.fullname || "User"}
                            className="rounded-[50%] z-0"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>

                <div className={"w-full"}>
                    <div
                        className="relative flex items-center flex-wrap gap-1 py-1 group">

                        {comment?.level !== 0 && (
                            <span className="bg-gray-200 px-2 py-0.5 rounded text-sm">
                                @{commentAuthor?.username}
                            </span>
                        )}

                        <input
                            type="text"
                            name="comment"
                            id="comment"
                            placeholder=""
                            autoFocus={true}
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            className="flex-1 text-md outline-none bg-transparent"
                        />

                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-300"></span>

                        <span
                            className="absolute bottom-0 left-1/2 h-[2px] w-0 bg-none transition-all duration-200 group-focus-within:left-0 group-focus-within:w-full group-focus-within:bg-black"></span>
                    </div>

                    <div className="flex justify-end gap-2 items-center mt-2">
                        <Button
                            onClick={() => setShowReply("")}
                            variant={"ghost"}
                            className="text-xs font-semibold rounded-full py-1! px-4 cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant={"default"}
                            type={"submit"}
                            onClick={handleReply}
                            className="text-xs py-1! px-4 font-semibold rounded-full bg-gray-200 text-black hover:bg-gray-300 cursor-pointer"
                        >
                            Reply
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReplyInput;

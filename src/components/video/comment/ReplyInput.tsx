'use client';

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import useUserStore, {User} from "@/store/userStore";
import React, {useState} from "react";

const ReplyInput = ({
    setShowReply
                    }: {
    setShowReply: React.Dispatch<React.SetStateAction<string>>
}) => {
    const userData: User | null = useUserStore((state) => state.user);
    const [reply, setReply] = useState("");


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
                    <input
                        type="text"
                        name="comment"
                        id="comment"
                        placeholder="Add a comment..."
                        autoFocus={true}
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        className="w-full transition-all duration-300 border-b-2 border-gray-300 text-md py-1 outline-hidden focus:outline-hidden focus:border-black"
                    />
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

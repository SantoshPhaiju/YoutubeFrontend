"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import CommentReplies from "@/components/video/comment/CommentReplies";
import ReplyInput from "@/components/video/comment/ReplyInput";
import {CommentHoverContext} from "@/context/comment-hover-context";
import useUserStore, {User} from "@/store/userStore";
import {formatViews} from "@/utils/formatVideoView";
import {timeAgo} from "@/utils/timeAgo";
import React, {useContext, useEffect, useState} from "react";
import {BiDislike, BiLike} from "react-icons/bi";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import CommentReplyComp from "@/components/video/comment/CommentReplyComp";
import {useReplyToCommentMutation} from "@/services/mutations/commentMutation";
import {useCommentReplyData} from "@/services/queries/commentQuery";
import {toast} from "sonner";

const Comment = ({
                     comment,
                     videoOwnerId,
                 }: {
    comment: any;
    videoOwnerId: string;
}) => {
    const [showCommentReplies, setShowCommentReplies] = useState(false);
    const userData: User | null = useUserStore((state) => state.user);
    const [showReply, setShowReply] = useState("");
    const hoverContext = useContext(CommentHoverContext);

    const currentLevel = comment?.level || 0;
    const shouldHighlight = hoverContext?.hoveredLevel === currentLevel - 1;

    const {refetch} = useCommentReplyData(comment?.rootId);

    const useReplyMutation = useReplyToCommentMutation();
    const [reply, setReply] = useState<string>("");
    useEffect(() => {
        if (showCommentReplies) {
            comment.replies = [];
        }
    }, [showCommentReplies]);

    const handleReply = async (e: any) => {
        e.preventDefault();

        try {
            const response = await useReplyMutation.mutateAsync({commentId: comment?._id, comment: reply});
            if (response.success) {
                console.log('response.data', response.data);
                setShowReply("");
                setReply("");
                if (showCommentReplies) {
                    await refetch();
                    comment.totalReplies = comment.totalReplies + 1;
                } else {
                    const newReply = response.data;
                    newReply.replies = [];
                    comment.replies.push(newReply);
                    comment.totalReplies = comment.totalReplies + 1;
                }
            }
        } catch (e: any) {
            console.log(e.message);
            toast.error(e.message);
        }
    }

    return (
        <>
            <div
                className={`comment flex gap-3 w-full ${shouldHighlight ? "thread-level-hovered" : ""}`}
                data-level={comment?.level}
            >
                <div className="flex flex-col items-center shrink-0">
                    <div className="w-10 h-10 z-0 shrink-0">
                        <Avatar className="">
                            <AvatarImage
                                src={comment?.author?.avatar}
                                alt={comment?.author?.fullname || "User"}
                                className="rounded-[50%] z-0"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    {comment?.totalReplies > 0 && (
                        <div
                            className="thread-line-track"
                            onClick={() => setShowCommentReplies(!showCommentReplies)}
                            onMouseEnter={() => {
                                hoverContext?.setHoveredLevel(currentLevel);
                            }}
                            onMouseLeave={() => {
                                hoverContext?.setHoveredLevel(null);
                            }}
                        >
                            <div className="thread-line"/>
                        </div>
                    )}
                </div>
                <div className={"w-full"}>
                    <div className="flex gap-1 items-center justify-start w-full">
                        {videoOwnerId === comment?.author?._id ? (
                            <>
                                <Badge className={"px-1 mr-1"}>
                                    @{comment?.author?.username}
                                </Badge>
                            </>
                        ) : (
                            <div className="text-gray-800 text-xs font-semibold">
                                @{comment?.author?.username}
                            </div>
                        )}
                        <div className="text-gray-600 text-[12px] font-normal">
                            {timeAgo(comment?.createdAt)}
                        </div>
                    </div>
                    <div className={"mt-1 text-[15px]"}>{comment?.content}</div>
                    <div className="flex justify-start gap-4 items-center mt-2 text-md">
                        <div className="likes flex justify-start items-center gap-2">
                            <div className="flex justify-center items-center gap-1">
                                <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                                    <BiLike size={18} className=""/>
                                </div>
                                <p className="font-sans font-semibold text-sm">
                                    {formatViews(comment?.likeCount || 0)}
                                </p>
                            </div>
                            <div className="">
                                <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                                    <BiDislike size={18}/>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={() => {
                                setShowReply(comment?._id);
                            }}
                            variant={"ghost"}
                            className={
                                "shadow-none cursor-pointer rounded-full transition-all duration-300 hover:bg-accent text-xs py-1 px-3"
                            }
                        >
                            Reply
                        </Button>
                    </div>
                    {showReply === comment._id && (
                        <ReplyInput handleReply={handleReply} reply={reply} setReply={setReply} comment={comment}
                                    setShowReply={setShowReply}/>
                    )}
                    {
                        comment?.replies?.length > 0 && comment?.replies.map((comment: any, index: number) => {
                            return (
                                <div key={index} className="-ml-1">
                                    <CommentReplyComp videoOwnerId={videoOwnerId}
                                                      userData={userData} comment={comment}/>
                                </div>
                            )
                        })
                    }
                    {comment?.totalReplies > 0 &&
                        (!showCommentReplies ? (
                            <div
                                className="flex justify-center gap-1 items-center mt-2 text-sm text-black font-medium cursor-pointer hover:bg-gray-200 transition-all duration-300 py-2 px-2 rounded-full w-fit select-none mb-1 text-center"
                                onClick={() => setShowCommentReplies(true)}
                            >
                                <div className={"flex gap-1.5 items-center"}>
                                    <div className={"w-1 h-1 bg-black rounded-full"}></div>
                                    {formatViews(comment?.totalReplies || 0)} replies
                                </div>
                                <div>
                                    <MdKeyboardArrowDown size={24}/>
                                </div>
                            </div>
                        ) : (
                            <>
                                <CommentReplies videoOwnerId={videoOwnerId} userData={userData}
                                                commentId={comment?._id}/>
                                <div
                                    className="flex justify-center gap-1 items-center mt-3 text-sm text-black font-medium cursor-pointer hover:bg-gray-200 transition-all duration-300 py-2 px-2 rounded-full w-fit select-none mb-1"
                                    onClick={() => setShowCommentReplies(false)}
                                >
                                    Hide replies
                                    <div>
                                        <MdKeyboardArrowUp size={24}/>
                                    </div>
                                </div>
                            </>
                        ))}
                </div>
            </div>
        </>
    );
};

export default Comment;

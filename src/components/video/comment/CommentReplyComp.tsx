"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ReplyInput from "@/components/video/comment/ReplyInput";
import { CommentHoverContext } from "@/context/comment-hover-context";
import { formatViews } from "@/utils/formatVideoView";
import { timeAgo } from "@/utils/timeAgo";
import { useContext, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useReplyToCommentMutation } from "@/services/mutations/commentMutation";
import { useCommentReplyData } from "@/services/queries/commentQuery";
import { toast } from "sonner";
import {useQueryClient} from "@tanstack/react-query";

const CommentReplyComp = ({
  comment,
  userData,
  videoOwnerId,
}: {
  comment: any;
  userData: any;
  videoOwnerId: string;
}) => {
  const [showReply, setShowReply] = useState("");
  const [reply, setReply] = useState("");
  const [showNestedReplies, setShowNestedReplies] = useState(true);
  const useReplyMutation = useReplyToCommentMutation();

  const hoverContext = useContext(CommentHoverContext);
  const queryClient = useQueryClient();

  const currentLevel = comment?.level || 0;
  const shouldHighlight = hoverContext?.hoveredLevel === currentLevel - 1;

  const handleNestedReply = async (e: any) => {
    e.preventDefault();

    try {
      const response = await useReplyMutation.mutateAsync({commentId: comment?._id, comment: reply});
      if (response.success) {
        setShowReply("");
        setReply("");

        const invalidated = await queryClient.invalidateQueries({
          queryKey: ["commentReplyData", comment.rootId],
        });
          // const newReply = response.data;
          // newReply.replies = [];
          // comment.replies.push(newReply);
          // comment.totalReplies = comment.totalReplies + 1;

      }
    } catch (e: any) {
      console.log(e.message);
      toast.error(e.message);
    }
  }

  return (
    <>
      <div
          style={{
            marginLeft: comment?.level == 1 ? "4px" : "8px",
          }}
        className={`comment flex gap-3 w-full mt-2 relative ${
          shouldHighlight ? "thread-level-hovered" : ""
        }`}
        data-level={comment?.level}
      >
        <div
          className="reply-l-connector"
          style={{
            borderLeftColor: shouldHighlight ? "#000" : "#e5e7eb",
            borderBottomColor: shouldHighlight ? "#000" : "#e5e7eb",
          }}
        />
        <div className="flex flex-col items-center shrink-0">
          <div className=" z-0 shrink-0">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={comment?.author?.avatar}
                alt={comment?.author?.fullname || "User"}
                className="rounded-[50%] z-0"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          {comment?.replies?.length > 0 && (
            <div
              className="thread-line-track"
              onClick={() => setShowNestedReplies(!showNestedReplies)}
              onMouseEnter={() => {
                hoverContext?.setHoveredLevel(currentLevel);
              }}
              onMouseLeave={() => {
                hoverContext?.setHoveredLevel(null);
              }}
            >
              <div className="thread-line" />
            </div>
          )}
        </div>
        <div className={"w-full"}>
          <div className="flex gap-1 items-center justify-start">
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
                  <BiLike size={18} className="" />
                </div>
                <p className="font-sans font-semibold text-sm">
                  {formatViews(comment?.likeCount)}
                </p>
              </div>
              <div className="">
                <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
                  <BiDislike size={18} />
                </div>
              </div>
            </div>
            <Button
              onClick={() => setShowReply(comment._id)}
              variant={"ghost"}
              className={
                "shadow-none cursor-pointer rounded-full transition-all duration-300 hover:bg-accent text-xs py-1 px-3"
              }
            >
              Reply
            </Button>
          </div>
          {showReply === comment._id && (
            <ReplyInput reply={reply} handleReply={handleNestedReply} setReply={setReply} comment={comment} setShowReply={setShowReply} />
          )}
          {
            (comment?.replies?.length > 0 && showNestedReplies === true) && comment?.replies.map((reply: any, index: number) => {
              return (
                <div key={index} className="-ml-1">
                  <CommentReplyComp videoOwnerId={videoOwnerId}
                                    userData={userData} comment={reply}/>
                </div>
              )
            })
          }
          {comment?.totalReplies > 0 &&
            (!showNestedReplies ? (
              <div
                className="flex justify-center gap-1 items-center mt-2 text-sm text-black font-medium cursor-pointer hover:bg-gray-200 transition-all duration-300 py-2 px-2 rounded-full w-fit select-none mb-1 text-center"
                onClick={() => setShowNestedReplies(true)}
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
                <div
                  className="flex justify-center gap-1 items-center mt-3 text-sm text-black font-medium cursor-pointer hover:bg-gray-200 transition-all duration-300 py-2 px-2 rounded-full w-fit select-none mb-1"
                  onClick={() => setShowNestedReplies(false)}
                >
                  Hide replies
                  <div>
                    <MdKeyboardArrowUp size={20} />
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default CommentReplyComp;

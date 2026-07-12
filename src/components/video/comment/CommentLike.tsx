"use client";

import { cn } from "@/lib/utils";
import { useCommentLikeMutation } from "@/services/mutations/likeMutation";
import useAuthStore from "@/store/authStore";
import { formatViews } from "@/utils/formatVideoView";
import { useState } from "react";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { toast } from "sonner";

const CommentLike = ({
  likeCount,
  commentId,
  isLiked,
  isDisliked,
}: {
  likeCount: number;
  commentId: string;
  isLiked: boolean;
  isDisliked: boolean;
}) => {
  const [isLikedClient, setIsLikedClient] = useState(isLiked);
  const [isDislikedClient, setIsDislikedClient] = useState(isDisliked);
  const [likeCountClient, setLikeCountClient] = useState(likeCount);
  const { mutateAsync } = useCommentLikeMutation();
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const handleLike = async (type: string, commentId: string) => {
    if (!isLoggedIn) {
      toast.error("Please sign in to like comments.");
      return;
    }

    setLoading(true);
    try {
      if (type === "like") {
        if (isLikedClient) {
          // Undo like
          setIsLikedClient(!isLikedClient);
          setLikeCountClient(likeCountClient - 1);
        } else {
          // New like or switch from dislike
          setIsLikedClient(!isLikedClient);
          setLikeCountClient(likeCountClient + 1);

          if (isDislikedClient) {
            setIsDislikedClient(false);
          }
        }
      } else {
        if (isDislikedClient) {
          // Undo dislike
          setIsDislikedClient(false);
        } else {
          // New dislike or switch from like
          setIsDislikedClient(true);

          if (isLikedClient) {
            setIsLikedClient(false);
            setLikeCountClient(likeCountClient - 1);
          }
        }
      }
      const likeResponse = await mutateAsync({ commentId: commentId, type });
      if (likeResponse.statusCode === 200) {
        setLikeCountClient(likeResponse.data.likeCount);
      }
    } catch (error) {
      console.error("Error liking comment:", error);
      toast.error("An error occurred while liking the comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="likes flex justify-start items-center gap-2">
        <button
          disabled={loading}
          onClick={() => {
            handleLike("like", commentId);
          }}
          className={cn(`flex justify-center items-center gap-1`, {
            "cursor-not-allowed": loading,
            "cursor-pointer": !loading,
          })}
        >
          <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
            {isLikedClient ? (
              <BiSolidLike size={18} className="" />
            ) : (
              <BiLike size={18} className="" />
            )}
          </div>
          <p className="font-sans font-semibold text-sm">
            {formatViews(likeCountClient || 0)}
          </p>
        </button>
        <button
          disabled={loading}
          onClick={() => {
            handleLike("dislike", commentId);
          }}
          className={cn(``, {
            "cursor-not-allowed": loading,
            "cursor-pointer": !loading,
          })}
        >
          <div className="rounded-full p-2 hover:bg-gray-200 transition-all duration-300">
            {isDislikedClient ? (
              <BiSolidDislike size={18} className="" />
            ) : (
              <BiDislike size={18} className="" />
            )}
          </div>
        </button>
      </div>
    </>
  );
};

export default CommentLike;

'use client';


import {formatViews} from "@/utils/formatVideoView";
import {MdKeyboardArrowDown} from "react-icons/md";
import {useCommentReplyData} from "@/services/queries/commentQuery";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {timeAgo} from "@/utils/timeAgo";
import {BiDislike, BiLike} from "react-icons/bi";
import {Button} from "@/components/ui/button";
import CommentReplyComp from "@/components/video/comment/CommentReplyComp";

const CommentReplies = ({
                            commentId,
                            userData,
                        }: {
    commentId: string;
    userData: any;
}) => {

    const {data, isLoading, isError, error} = useCommentReplyData(commentId);

    // 2. Handle the loading state
    if (isLoading) return <div>Loading replies...</div>;

    // 3. Handle the error state
    if (isError) return <div>Error loading replies: {error.message}</div>;

    console.log("commentreplies", data);
    return (
        <>
            {
                data.map((comment: any, index: number) => {
                    return (
                        <div key={index}>

                        <CommentReplyComp userData={userData} comment={comment} />
                        </div>
                    )
                })
            }
        </>
    );
};

export default CommentReplies;

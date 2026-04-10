'use client';

import {useCommentReplyData} from "@/services/queries/commentQuery";
import CommentReplyComp from "@/components/video/comment/CommentReplyComp";

const CommentReplies = ({
                            commentId,
                            userData,
                        }: {
    commentId: string;
    userData: any;
}) => {

    const {data, isLoading, isError, error} = useCommentReplyData(commentId);

    if (isLoading) return <div>Loading replies...</div>;

    if (isError) return <div>Error loading replies: {error.message}</div>;

    console.log("commentreplies", data);
    return (
        <>
            {
                data.map((comment: any, index: number) => {
                    return (
                        <div key={index}>
                            <CommentReplyComp userData={userData} comment={comment}/>
                        </div>
                    )
                })
            }
        </>
    );
};

export default CommentReplies;

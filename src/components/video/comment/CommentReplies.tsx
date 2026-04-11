'use client';

import {useCommentReplyData} from "@/services/queries/commentQuery";
import CommentReplyComp from "@/components/video/comment/CommentReplyComp";

const CommentReplies = ({
                            commentId,
                            userData,
    videoOwnerId,
                        }: {
    commentId: string;
    userData: any;
    videoOwnerId: string;
}) => {

    const {data, isLoading, isError, error} = useCommentReplyData(commentId);

    if (isLoading) return <div>Loading replies...</div>;

    if (isError) return <div>Error loading replies: {error.message}</div>;

    return (
        <>
            {
                data.map((comment: any, index: number) => {
                    return (
                        <div key={index} className="-ml-1">
                            <CommentReplyComp videoOwnerId={videoOwnerId} userData={userData} comment={comment}/>
                        </div>
                    )
                })
            }
        </>
    );
};

export default CommentReplies;

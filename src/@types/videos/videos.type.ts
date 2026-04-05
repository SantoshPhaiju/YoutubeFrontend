export interface IUser {
    _id: string;
    username: string;
    fullname: string;
    email: string;
    avatar: string;
    coverImage?: string;
    subscribersCount?: number;
    watchHistory?: IVideo[];
    isSubscribed?: boolean;
}

export interface IComment {
    content: string;
    video: string;
    commentedBy: IUser;
}




export interface IVideo {
    isDisliked: boolean;
    isLiked: boolean;
    _id: string;
    videoFile: string;
    thumbnail: string;
    title: string;
    description: string;
    owner: IUser | IUser[];
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
    commentCount: number;
    comments: IComment[];
    duration: number;
    isPublished: true;
    visibility: "public" | "private";
    createdAt: string;
    updatedAt: string;
}

export interface IUser {
    _id: string;
    username: string;
    fullname: string;
    email: string;
    avatar: string;
    coverImage?: string;
    watchHistory?: IVideo[];
}

export interface IComment {
    content: string;
    video: string;
    commentedBy: IUser;
}

export interface IVideo {
    _id: string;
    videoFile: string;
    thumbnail: string;
    title: string;
    description: string;
    owner: IUser;
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
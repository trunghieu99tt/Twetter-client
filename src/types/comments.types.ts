import { iTweet } from "./tweet.types";
import { iUser } from "./user.types";

export interface iComment {
    _id: string;
    tweet: iTweet;
    media: string;
    author: iUser;
    content: string;
    isChild?: boolean;
    isEdited: boolean;
    createdAt: string;
    modifiedAt: string;
    replies: iComment[];
    likes: Partial<iUser>[];
}

export interface iCreateCommentDTO {
    content: string;
    media?: string;
}
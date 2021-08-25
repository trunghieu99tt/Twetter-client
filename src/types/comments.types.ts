import { iTweet } from "./tweet.types";
import { iUser } from "./user.types";

export interface iComment {
    tweet: iTweet;
    media: string;
    author: iUser;
    content: string;
    isEdited: boolean;
    createdAt: string;
    modifiedAt: string;
    replies: iComment[];
}
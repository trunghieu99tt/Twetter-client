import { iComment } from "./comments.types";
import { iUser } from "./user.types";

export interface iTweet {
    _id: string;
    author: iUser;
    save: iUser[];
    tags: string[];
    saved: string[];
    likes: string[];
    media: string[];
    createdAt: Date;
    content: string;
    location: string;
    modifiedAt: Date;
    audience: number;
    isRetweet: boolean;
    retweeted: string[];
    retweetedBy: iUser;
    comments: iComment[];
}

export interface iCreateTweetDTO {
    content: string;
    audience: number;
    tags?: string[];
    media?: string[];
}
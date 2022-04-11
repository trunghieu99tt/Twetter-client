import { iComment } from "./comments.types";
import { iUser } from "./user.types";

export interface iTweet {
  _id: string;
  author: iUser;
  save: iUser[];
  tags: string[];
  saved: iUser[];
  likes: iUser[];
  media: string[];
  createdAt: Date;
  content: string;
  location: string;
  modifiedAt: Date;
  audience: number;
  isRetweet: boolean;
  retweeted: iUser[];
  retweetedBy: iUser;
  comments: iComment[];
}

export interface iCreateTweetDTO {
  content: string;
  audience: number;
  tags?: string[];
  media?: string[];
}

export interface iTweetReport {
  userId: string;
  reportTime: Date;
}

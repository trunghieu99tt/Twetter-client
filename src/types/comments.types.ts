import { iTweet } from "./tweet.types";
import { iUser } from "./user.types";

export interface iComment {
  _id: string;
  tweet: iTweet;
  media: string;
  author: iUser;
  likes: string[];
  content: string;
  isChild?: boolean;
  isEdited: boolean;
  createdAt: string;
  modifiedAt: string;
  replies: iComment[];
}

export interface iCreateCommentDTO {
  content: string;
  media?: string;
}

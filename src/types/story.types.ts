import { iUser } from "./user.types";

export interface iStory {
    _id: string;
    owner: iUser;
    content: string;
    audience: number;
    viewerIds: string[];
}

export interface iStoryCreate {
    content: string;
    audience: number;
}
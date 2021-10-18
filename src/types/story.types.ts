import { iUser } from "./user.types";

export interface iStory {
    _id: string;
    owner: iUser;
    type: string;
    content: string;
    audience: number;
    viewerIds: string[];
    createdAt: Date;
}

export interface iStoryCreate {
    type: string;
    content: string;
    audience: number;
}

export interface iStoryGroup {
    [key: string]: iStory[];
}
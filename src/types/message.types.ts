import { iUser } from "./user.types";

export interface iMessage {
    _id: string;
    content: string;
    file?: string;
    createdAt: Date;
    roomId: string;
    author: iUser
}

export interface iFile {
    file: File | null;
    url: string;
}
import { iUser } from "./user.types";


export interface iNotification {
    _id: string;
    url: string;
    text: string;
    type: string;
    image?: string;
    sender: iUser;
    isRead: boolean;
    content?: string;
    createdAt: Date;
    receiver: string[];
};

export interface iNotificationDTO {
    url?: string;
    text: string;
    type: string;
    receivers: string[];
    image?: string;
}
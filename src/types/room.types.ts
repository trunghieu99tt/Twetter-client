import { iMessage } from "./message.types";
import { iUser } from "./user.types";

export interface iRoom {
  _id: string;
  owner: iUser;
  name: string;
  isDm: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  members: iUser[];
  isPrivate?: boolean;
  messages: iMessage[];
  description: string;
}

export interface iRoomDTO {
  name?: string;
  isDm?: boolean;
  image?: string;
  members: string[];
  description?: string;
}

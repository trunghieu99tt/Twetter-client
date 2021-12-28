import { atom } from "recoil";
import { iUser } from "@type/user.types";

export const prevUserState = atom<iUser | null>({
    key: "prevUser",
    default: null,
});

export const connectedUsersState = atom<iUser[] | null>({
    key: "connectedUsers",
    default: null,
});

export const adminState = atom<iUser | null>({
    key: "admin",
    default: null,
});

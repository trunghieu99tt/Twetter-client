import { atom } from "recoil";
import { iUser } from "@type/user.types";

export const userState = atom<iUser | null>({
    key: "user",
    default: null,
});

export const connectedUsersState = atom<iUser[] | null>({
    key: "connectedUsers",
    default: null
})
import { iRoom } from "@type/room.types";
import { atom } from "recoil";

export const connectedRoomsState = atom<iRoom[] | null>({
    key: "connectedRoomsState",
    default: null,
});

export const joinDMRoomState = atom<{ userIds: string[] } | null>({
    key: "joinDMRoomState",
    default: null,
});

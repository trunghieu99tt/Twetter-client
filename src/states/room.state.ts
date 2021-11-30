import { iRoom } from "@type/room.types";
import { atom, selectorFamily } from "recoil";

export const connectedRoomsState = atom<iRoom[] | null>({
    key: "connectedRoomsState",
    default: null,
});

export const connectedRoomSelector = selectorFamily({
    key: "connectedRoomSelector",
    get:
        (roomId: string) =>
        ({ get }) => {
            const connectedRooms = get(connectedRoomsState);
            if (connectedRooms) {
                return connectedRooms.find((room) => room._id === roomId);
            }
            return null;
        },
});

export const joinDMRoomState = atom<{ userIds: string[] } | null>({
    key: "joinDMRoomState",
    default: null,
});

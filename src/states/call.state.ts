import { atom } from "recoil";

export const callState = atom<any>({
    key: "callState",
    default: null,
});

export const roomsHaveCallState = atom<string[]>({
    key: "roomHasCallState",
    default: [],
});

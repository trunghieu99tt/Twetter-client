import { atom } from "recoil";

export const callState = atom<any>({
    key: "callState",
    default: null,
});

export const roomsHaveCallState = atom<
    {
        roomId: string;
        channelName: string;
        token: string;
    }[]
>({
    key: "roomHasCallState",
    default: [],
});

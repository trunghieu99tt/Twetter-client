import { atom } from "recoil";

export const peerState = atom<any | null>({
  key: "peerState",
  default: null,
});

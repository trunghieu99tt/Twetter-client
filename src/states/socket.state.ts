import { atom } from "recoil";
import { Socket } from "socket.io-client";

export const socketState = atom<Socket | null>({
  key: "socketState",
  default: null,
});

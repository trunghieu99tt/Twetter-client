import Peer from "peerjs";
import { atom } from "recoil";

export const peerState = atom<Peer | null>({
    key: 'peerState',
    default: null
})
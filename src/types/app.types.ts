import Peer from "peerjs";
import { Socket } from "socket.io-client";

export type TTheme = "LIGHT" | "DARK";
export type TScreenSize = "DESKTOP" | "TABLET" | "MOBILE";


export type TAppAction = {
    type: 'SET_THEME',
    payload: TTheme;
} | {
    type: 'SET_VISIBLE_LEFT_SIDEBAR',
    payload: boolean;
} | {
    type: 'SET_SCREEN_SIZE',
    payload: TScreenSize;
} | {
    type: 'SET_PEER',
    payload: Peer | null;
} | {
    type: 'SET_SOCKET',
    payload: Socket | null;
};

export type TAppState = {
    theme: TTheme;
    peer: Peer | null;
    socket: Socket | null;
    screenSize: TScreenSize;
    visibleLeftSidebar: boolean;
};

export type TAppDispatch = (action: TAppAction) => void;

export type TAppContextProps = {
    children: React.ReactNode;
};
export interface Size {
    width: number | undefined;
    height: number | undefined;
}

export type TImageInput = {
    file: File | null;
    preview: string | null;
};

export type TMedia = {
    id?: string;
    url: string;
    type?: string;
    file?: File | null;
};

export type TMapExistence = {
    [key: string]: boolean;
};
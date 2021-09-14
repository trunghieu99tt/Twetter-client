export type TTheme = "LIGHT" | "DARK"
export type TScreenSize = "DESKTOP" | "TABLET" | "MOBILE";


export type TAppAction = {
    type: 'SET_THEME',
    payload: TTheme
} | {
    type: 'SET_VISIBLE_LEFT_SIDEBAR',
    payload: boolean
} | {
    type: 'SET_SCREEN_SIZE',
    payload: TScreenSize
}

export type TAppState = {
    theme: TTheme;
    screenSize: TScreenSize;
    visibleLeftSidebar: boolean;
}

export type TAppDispatch = (action: TAppAction) => void;

export type TAppContextProps = {
    children: React.ReactNode;
}
export interface Size {
    width: number | undefined;
    height: number | undefined;
}

export type TImageInput = {
    file: File | null;
    preview: string | null;
}
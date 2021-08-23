export type TTheme = "LIGHT" | "DARK"

export type TAppAction = {
    type: 'SET_THEME',
    payload: TTheme
}

export type TAppState = {
    theme: TTheme
}

export type TAppDispatch = (action: TAppAction) => void;

export type TAppContextProps = {
    children: React.ReactNode;
}


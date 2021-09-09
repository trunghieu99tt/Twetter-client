import React, { useContext, useMemo, useReducer } from "react";
import {
    TAppState,
    TAppAction,
    TAppDispatch,
    TAppContextProps,
} from "../types/app.types";

const initialState: TAppState = {
    theme: "LIGHT",
    screenSize: "DESKTOP",
    visibleLeftSidebar: false,
};

const AppContext = React.createContext<{
    state: TAppState;
    dispatch: TAppDispatch;
} | null>(null);

const appReducer = (state: TAppState = initialState, action: TAppAction) => {
    switch (action.type) {
        case "SET_THEME":
            return {
                ...state,
                theme: action.payload,
            };
        case "SET_VISIBLE_LEFT_SIDEBAR":
            return {
                ...state,
                visibleLeftSidebar: action.payload,
            };
        case "SET_SCREEN_SIZE":
            return {
                ...state,
                screenSize: action.payload,
            };
        default:
            return state;
    }
};

const AppProvider = ({ children }: TAppContextProps) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === null) {
        throw new Error("AppContext is not available");
    }
    return context;
};

export default AppProvider;

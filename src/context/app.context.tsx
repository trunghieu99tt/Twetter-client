import React, { useContext, useMemo, useReducer } from "react";
import {
    TAppState,
    TAppAction,
    TAppDispatch,
    TAppContextProps,
} from "../types/app.types";

const initialState: TAppState = {
    peer: null,
    socket: null,
    theme: "LIGHT",
    screenSize: "DESKTOP",
    visibleLeftSidebar: false,
    visibleAddGroupChatModal: false,
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
        case "SET_PEER":
            return {
                ...state,
                peer: action.payload,
            };
        case "SET_SOCKET":
            return {
                ...state,
                socket: action.payload,
            };
        case "SET_VISIBLE_ADD_GROUP_CHAT_MODAL":
            console.log("Go here");
            return {
                ...state,
                visibleAddGroupChatModal: action.payload,
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

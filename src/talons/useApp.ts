import { useAppContext } from "@context/app.context"
import { useWindowSize } from "@hooks/useWindowSize";
import { MutableRefObject, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router";
import { useUser } from "./useUser";

export const useApp = () => {
    const { user, getMeQuery } = useUser();
    const history = useHistory();
    const location = useLocation();
    const currentPathRef = useRef(null) as MutableRefObject<string | null>;

    const { state: {
        screenSize,
    }, dispatch } = useAppContext();
    const { width = 1920 } = useWindowSize();

    useEffect(() => {
        currentPathRef.current = location.pathname;
    }, []);

    useEffect(() => {
        const windowHref = window.location.href;
        if (!user?._id) {
            if (!windowHref.includes("auth")) {
                history.push("/auth");
            }
        } else {
            if (windowHref.includes("auth")) {
                if (
                    currentPathRef.current &&
                    currentPathRef.current !== "/auth"
                ) {
                    history.push(currentPathRef.current);
                } else history.push("/");
            }
        }
    }, [user]);

    useEffect(() => {
        if (width < 768) {
            if (screenSize !== 'MOBILE') {
                dispatch({
                    type: "SET_SCREEN_SIZE",
                    payload: "MOBILE"
                });
            }
        }
        else if (width >= 768 && width < 1024) {
            if (screenSize !== 'TABLET') {
                dispatch({
                    type: "SET_SCREEN_SIZE",
                    payload: "TABLET"
                });
            }
        }
        else {
            if (screenSize !== 'DESKTOP') {
                dispatch({
                    type: "SET_SCREEN_SIZE",
                    payload: "DESKTOP"
                });
            }
        }
    }, [width]);

    return {
        user,
        isLoading: getMeQuery.isLoading
    }

}
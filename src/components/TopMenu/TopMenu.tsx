import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

// talons
import { useAppContext } from "@context/app.context";

// icons
import { AiOutlineClose } from "react-icons/ai";

// styles
import { Item, List, Container, CloseButton } from "./TopMenuStyle";

// fixed data
import { useMemo } from "react";

const TopMenu = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const {
        state: { visibleLeftSidebar, screenSize },
        dispatch,
    } = useAppContext();

    const menu = useMemo(
        () => [
            {
                name: t("home"),
                path: "/",
                id: uuidv4(),
            },
            {
                name: t("explore"),
                path: "/explore/top",
                submenus: [
                    "/explore/latest",
                    "/explore/top",
                    "/explore/people",
                    "/explore/media",
                ],
                id: uuidv4(),
            },
            {
                name: t("bookmark"),
                path: "/bookmarks",
                id: uuidv4(),
            },
            {
                name: t("search"),
                path: "/search",
                id: uuidv4(),
            },
        ],
        []
    );

    const closeMenu = () =>
        dispatch({
            type: "SET_VISIBLE_LEFT_SIDEBAR",
            payload: false,
        });

    const shouldShowCloseButton =
        screenSize !== "DESKTOP" && visibleLeftSidebar;

    return (
        <Container>
            {shouldShowCloseButton && (
                <CloseButton onClick={closeMenu}>
                    <AiOutlineClose />
                </CloseButton>
            )}

            <List>
                {menu?.map((item, idx) => {
                    return (
                        <Item
                            key={item.id}
                            active={
                                location.pathname === item.path ||
                                item?.submenus?.includes(location.pathname) ||
                                false
                            }
                        >
                            <Link to={item.path}>{item.name}</Link>
                        </Item>
                    );
                })}
            </List>
        </Container>
    );
};

export default TopMenu;

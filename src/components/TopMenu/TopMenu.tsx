import { Link, useLocation } from "react-router-dom";

// hooks
import { useWindowSize } from "@hooks/useWindowSize";

// talons
import { useAppContext } from "@context/app.context";

// icons
import { AiOutlineClose } from "react-icons/ai";

// styles
import { Item, List, Container, CloseButton } from "./TopMenuStyle";

// fixed data
import { menu } from "./menu.data";

const TopMenu = () => {
    const location = useLocation();
    const {
        state: { visibleLeftSidebar, screenSize },
        dispatch,
    } = useAppContext();

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
                            active={location.pathname.includes(item.path)}
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

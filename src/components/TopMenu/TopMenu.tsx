import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Item, List, Container } from "./TopMenuStyle";

const menu = [
    {
        name: "Home",
        path: "/",
        id: uuidv4(),
    },
    {
        name: "Explore",
        path: "/explore",
        id: uuidv4(),
    },
    {
        name: "Bookmarks",
        path: "/bookmarks",
        id: uuidv4(),
    },
];

const TopMenu = () => {
    const location = useLocation();

    return (
        <Container>
            <List>
                {menu?.map((item, idx) => {
                    return (
                        <Item
                            key={item.id}
                            active={item.path === location.pathname}
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

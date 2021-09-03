import { Link, useLocation } from "react-router-dom";

// styles
import { Item, List, Container } from "./TopMenuStyle";

// fixed data
import { menu } from "./menu.data";

const TopMenu = () => {
    const location = useLocation();

    return (
        <Container>
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

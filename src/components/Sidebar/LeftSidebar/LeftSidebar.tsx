// styles
import { Link, useLocation } from "react-router-dom";
import { List, ListItem, Wrapper } from "./LeftSidebarStyle";

// data
import { myProfileRouter, newFeedsRouter } from "./router.data";

interface Props {
    type: "PROFILE" | "NEWS_FEED";
}

const LeftSidebar = ({ type }: Props) => {
    const data = type === "PROFILE" ? myProfileRouter : newFeedsRouter;

    const location = useLocation();
    const pathname = location.pathname;

    return (
        <Wrapper>
            <List>
                {data.map((item) => {
                    return (
                        <ListItem key={item.id} active={item.path === pathname}>
                            <Link to={item.path}>{item.name}</Link>
                        </ListItem>
                    );
                })}
            </List>
        </Wrapper>
    );
};

export default LeftSidebar;

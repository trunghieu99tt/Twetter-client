// styles
import { Link, useLocation, useParams } from "react-router-dom";
import { List, ListItem, Wrapper } from "./LeftSidebarStyle";

// data
import { myProfileRouter, newFeedsRouter } from "./router.data";

interface Props {
    type: "PROFILE" | "NEWS_FEED";
    routes?: any;
}

const LeftSidebar = ({ type }: Props) => {
    const params: { userId: string } = useParams();
    const { userId } = params;
    const data = type === "PROFILE" ? myProfileRouter : newFeedsRouter;

    const location = useLocation();
    const pathname = location.pathname;

    return (
        <Wrapper>
            <List>
                {data.map((item) => {
                    const path =
                        type === "PROFILE"
                            ? `${item.path}/${userId}`
                            : item.path;
                    return (
                        <ListItem key={item.id} active={pathname === path}>
                            <Link to={path}>{item.name}</Link>
                        </ListItem>
                    );
                })}
            </List>
        </Wrapper>
    );
};

export default LeftSidebar;

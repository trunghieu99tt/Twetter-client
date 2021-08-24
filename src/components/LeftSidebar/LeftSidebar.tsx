// styles
import { Link } from "react-router-dom";
import { List, ListItem, Wrapper } from "./LeftSidebarStyle";

// data
import { myProfileRouter, newFeedsRouter } from "./router.data";

interface Props {
    type: "PROFILE" | "NEWS_FEED";
}

const LeftSidebar = ({ type }: Props) => {
    const data = type === "PROFILE" ? myProfileRouter : newFeedsRouter;

    return (
        <Wrapper>
            <List>
                {data.map((item) => {
                    return (
                        <ListItem key={item.id} active={true}>
                            <Link to={item.path}>{item.name}</Link>
                        </ListItem>
                    );
                })}
            </List>
        </Wrapper>
    );
};

export default LeftSidebar;

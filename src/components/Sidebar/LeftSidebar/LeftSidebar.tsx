import { Link, useLocation, useParams } from "react-router-dom";
import { List, ListItem, Wrapper } from "./LeftSidebarStyle";
import { v4 as uuid } from "uuid";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    type: "PROFILE" | "NEWS_FEED";
    routes?: any;
}

const LeftSidebar = ({ type }: Props) => {
    const { t } = useTranslation();

    const params: { userId: string } = useParams();

    const { userId } = params;

    const myProfileRouter = [
        {
            name: t("profile"),
            path: "/profile",
            id: uuid(),
        },
        {
            name: t("media"),
            path: "/profile/media",
            id: uuid(),
        },
        {
            name: t("like"),
            path: "/profile/likes",
            id: uuid(),
        },
    ];

    const newFeedsRouter = [
        {
            name: t("top"),
            path: "/explore/top",
            id: uuid(),
        },
        {
            name: t("latest"),
            path: "/explore/latest",
            id: uuid(),
        },
        {
            name: t("people"),
            path: "/explore/people",
            id: uuid(),
        },
        {
            name: t("media"),
            path: "/explore/media",
            id: uuid(),
        },
    ];

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

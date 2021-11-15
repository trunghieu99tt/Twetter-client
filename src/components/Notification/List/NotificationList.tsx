import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

// talons
import { useUser } from "@talons/useUser";
import { useNotify } from "@talons/useNotify";

// components
import NotificationItem from "../Item/NotificationItem";

// types
import { iNotification } from "@type/notify.types";

// styles
import classes from "./notificationList.module.css";

type Props = {
    isPage?: boolean;
};

const LIST_LIMIT = 4;

const NotificationList = ({ isPage = false }: Props) => {
    const { t } = useTranslation();
    const { readNotificationAction, getNotificationsQuery } = useNotify();
    const { user } = useUser();
    const { data, fetchNextPage } = getNotificationsQuery;
    const pages = data?.pages;
    const totalRecords = pages?.[0].total || 0;

    const notifications: iNotification[] =
        data?.pages?.reduce(
            (
                res: iNotification[],
                curr: {
                    data: iNotification[];
                    total: number;
                }
            ) => [...res, ...curr.data],
            []
        ) || [];

    const markAllAsRead = () => {
        const unreadNotificationsIds =
            notifications
                .filter(
                    (notification: iNotification) =>
                        !notification.isRead.includes(user?._id)
                )
                .map((noti: iNotification) => noti._id) || [];

        if (unreadNotificationsIds.length > 0) {
            readNotificationAction(unreadNotificationsIds);
        }
    };

    const isNotRead = notifications.filter(
        (notification) => !notification.isRead.includes(user?._id)
    ).length;

    const shouldHaveViewAll = notifications.length > LIST_LIMIT;

    const list = isPage
        ? notifications
        : notifications.slice(0, Math.min(LIST_LIMIT, notifications.length));
    const hasMore = list.length < totalRecords;

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <p>{t("notification")}</p>
                {isNotRead > 0 && (
                    <button
                        onClick={markAllAsRead}
                        className={classes.readAllBtn}
                    >
                        {t("readAll")}
                    </button>
                )}
            </div>
            <div className={classes.main}>
                {!isPage &&
                    list?.map((notification: iNotification) => {
                        return (
                            <NotificationItem
                                key={notification._id}
                                data={notification}
                            />
                        );
                    })}
                {isPage && (
                    <InfiniteScroll
                        dataLength={list.length}
                        next={fetchNextPage}
                        hasMore={hasMore}
                        loader={<div>Loading...</div>}
                    >
                        {list?.map((notification: iNotification) => {
                            return (
                                <NotificationItem
                                    key={notification._id}
                                    data={notification}
                                />
                            );
                        })}
                    </InfiniteScroll>
                )}
            </div>

            {!isPage && shouldHaveViewAll && (
                <Link
                    to="/notifications"
                    className={classes.readAllNotifications}
                >
                    {t("viewAllNotification")}
                </Link>
            )}
        </div>
    );
};

export default NotificationList;

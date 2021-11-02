import { useTranslation } from "react-i18next";

// talons
import { useUser } from "@talons/useUser";
import { useNotify } from "@talons/useNotify";

// components
import NotificationItem from "../Item/NotificationItem";

// types
import { iNotification } from "@type/notify.types";

// styles
import classes from "./notificationList.module.css";

const NotificationList = () => {
    const { t } = useTranslation();
    const { readNotificationAction, getNotificationsQuery } = useNotify();
    const { user } = useUser();

    const notifications: iNotification[] =
        getNotificationsQuery?.data?.pages?.reduce(
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
                {notifications?.map((notification: iNotification) => {
                    return (
                        <NotificationItem
                            key={notification._id}
                            data={notification}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default NotificationList;

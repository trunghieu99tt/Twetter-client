import { useNotify } from "@talons/useNotify";
import { useUser } from "@talons/useUser";
import { iNotification } from "@type/notify.types";

import NotificationItem from "../Item/NotificationItem";

import classes from "./notificationList.module.css";

const NotificationList = () => {
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

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <p>Activities</p>
                <button onClick={markAllAsRead} className={classes.readAllBtn}>
                    Read all
                </button>
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

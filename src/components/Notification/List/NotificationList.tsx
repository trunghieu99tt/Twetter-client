import { useNotify } from "@talons/useNotify";
import { iNotification } from "@type/notify.types";

import NotificationItem from "../Item/NotificationItem";

import classes from "./notificationList.module.css";

interface Props {}

const NotificationList = (props: Props) => {
    const { notifications } = useNotify();

    return (
        <div className={classes.root}>
            {notifications?.map((notification: iNotification) => {
                return (
                    <NotificationItem
                        key={notification._id}
                        data={notification}
                    />
                );
            })}
        </div>
    );
};

export default NotificationList;

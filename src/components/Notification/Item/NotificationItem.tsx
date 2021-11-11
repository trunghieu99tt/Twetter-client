import React from "react";
import cn from "classnames";
import { useHistory } from "react-router";

// utils
import { calcDiffTimeString } from "@utils/helper";

// types
import { iNotification } from "@type/notify.types";

// styles
import classes from "./notificationItem.module.css";
import { useUser } from "@talons/useUser";
import { useNotify } from "@talons/useNotify";

type Props = {
    data: iNotification;
};

const NotificationItem = ({ data }: Props) => {
    const { user } = useUser();
    const history = useHistory();
    const { readNotificationAction } = useNotify();

    const onClick = () => {
        if (data?._id) {
            readNotificationAction([data._id]);
        }

        if (data?.url) {
            history.push(data.url);
        }
    };

    return (
        <button
            className={cn(classes.root, {
                [classes.unread]: !data?.isRead?.includes(user?._id),
            })}
            onClick={onClick}
        >
            <figure className={classes.senderAvatarWrapper}>
                <img
                    src={data?.sender.avatar}
                    alt="sender avatar"
                    className={classes.senderAvatar}
                />
            </figure>
            <div className={classes.main}>
                <p className={classes.text}>
                    <strong>{data?.sender?.name || ""}</strong>{" "}
                    {data?.text || ""}
                </p>
                <p className={classes.time}>
                    {calcDiffTimeString(data?.createdAt || new Date())}
                </p>
            </div>
        </button>
    );
};

export default NotificationItem;

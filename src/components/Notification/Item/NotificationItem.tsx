import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

// utils
import { calcDiffTimeString } from "@utils/helper";

// types
import { iNotification } from "@type/notify.types";

// styles
import classes from "./notificationItem.module.css";

type Props = {
    data: iNotification;
};

const NotificationItem = ({ data }: Props) => {
    return (
        <Link
            className={cn(classes.root, {
                [classes.unread]: data?.isRead === false,
            })}
            to={`${data?.url || "/"}`}
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
        </Link>
    );
};

export default NotificationItem;

import React from "react";
import cn from "classnames";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

// talons
import { useUser } from "@talons/useUser";
import { useNotify } from "@talons/useNotify";

// utils
import { calcDiffTimeString } from "@utils/helper";

// types
import { iNotification } from "@type/notify.types";

// images
import DefaultUnknownAvatar from "@images/user.png";

// styles
import classes from "./notificationItem.module.css";
import UserAvatarSmall from "@components/UserAvatarSmall";

type Props = {
  data: iNotification;
};

const NotificationItem = ({ data }: Props) => {
  const { t } = useTranslation();
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
    <article
      className={cn(classes.root, {
        [classes.unread]: !data?.isRead?.includes(user?._id),
      })}
      onClick={onClick}
    >
      <figure className={classes.senderAvatarWrapper}>
        {/* <img
          src={data?.sender?.avatar || DefaultUnknownAvatar}
          alt="sender avatar"
          className={classes.senderAvatar}
          loading="lazy"
        /> */}
        <UserAvatarSmall user={data?.sender} />
      </figure>
      <div className={classes.main}>
        <p className={classes.text}>
          <strong>{data?.sender?.name || ""}</strong> {t(data?.text || "")}
        </p>
        <p className={classes.time}>
          {calcDiffTimeString(data?.createdAt || new Date())}
        </p>
      </div>
    </article>
  );
};

export default NotificationItem;

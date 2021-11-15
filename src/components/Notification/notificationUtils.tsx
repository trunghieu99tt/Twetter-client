import { iNotification } from "@type/notify.types";
import { toast } from "react-toastify";

import NotificationItem from "./Item/NotificationItem";

export const showNotificationToast = (data: iNotification) => {
    toast(<NotificationItem data={data} />);
};

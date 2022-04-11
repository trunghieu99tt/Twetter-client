import { iNotification } from "@type/notify.types";
import { atom } from "recoil";

export const notificationState = atom<iNotification | null>({
  key: "notificationState",
  default: null,
});

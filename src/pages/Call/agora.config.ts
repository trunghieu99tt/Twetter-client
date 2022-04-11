import { createClient } from "agora-rtc-react";
import { ClientConfig } from "agora-rtc-sdk-ng";

const config: ClientConfig = {
  mode: "rtc",
  codec: "vp8",
};

export const useAgoraClient = createClient(config);

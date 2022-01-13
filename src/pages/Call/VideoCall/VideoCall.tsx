import { createMicrophoneAndCameraTracks } from "agora-rtc-react";
import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

// talons
import { useVideoCall } from "./useVideoCall";

// components
import Videos from "../Videos";
import Controls from "../Controls";

// configs
import { AGORA_APP_ID } from "@config/secret";
import { useAgoraClient } from "../agora.config";

import classes from "./videoCall.module.css";
import { useRecoilValue } from "recoil";
import { roomsHaveCallState } from "states/call.state";

const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoCall = (props: { channelName: string }) => {
    const { getToken } = useVideoCall();
    const { channelName } = props;
    const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
    const [start, setStart] = useState<boolean>(false);
    const client = useAgoraClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();
    const roomsHaveCall = useRecoilValue(roomsHaveCallState);

    useEffect(() => {
        const init = async (name: string) => {
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "video") {
                    setUsers((prevUsers) => {
                        return [...prevUsers, user];
                    });
                }
                if (mediaType === "audio") {
                    user.audioTrack?.play();
                }
            });

            client.on("user-unpublished", (user, type) => {
                console.log("unpublished", user, type);
                if (type === "audio") {
                    user.audioTrack?.stop();
                }
                if (type === "video") {
                    setUsers((prevUsers) => {
                        return prevUsers.filter(
                            (User) => User.uid !== user.uid
                        );
                    });
                }
            });

            client.on("user-left", (user) => {
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                });
            });

            const currentRoom = roomsHaveCall.find(
                (r) => r.channelName === name
            );

            let token = currentRoom?.token;

            if (!token) {
                token = await getToken(name);
            }

            if (token) {
                await client.join(AGORA_APP_ID, name, token, null);
                if (tracks) await client.publish([tracks[0], tracks[1]]);
                setStart(true);
            }
        };

        if (ready && tracks) {
            init(channelName);
        }
    }, [channelName, client, ready, tracks]);

    return (
        <div className={classes.root}>
            {ready && tracks && (
                <Controls tracks={tracks} setStart={setStart} />
            )}
            {start && tracks && <Videos users={users} tracks={tracks} />}
        </div>
    );
};

export default VideoCall;

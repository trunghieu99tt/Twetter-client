import React, { useEffect, useState } from "react";
import cn from "classnames";
import { useHistory } from "react-router";

// talons
import { useUser } from "@talons/useUser";

// icons
import { FaVideoSlash, FaVideo } from "react-icons/fa";
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";

// context
import { useAppContext } from "@context/app.context";

// config
import { useAgoraClient } from "../agora.config";

// styles
import classes from "./controls.module.css";

type Props = {
    tracks: any;
    setStart: any;
};

const Controls = ({ setStart, tracks }: Props) => {
    const history = useHistory();
    const client = useAgoraClient();
    const {
        state: { socket },
    } = useAppContext();
    const { user } = useUser();
    const [trackState, setTrackState] = useState({ video: true, audio: true });

    const mute = async (type: "audio" | "video") => {
        if (type === "audio") {
            await tracks[0].setEnabled(!trackState.audio);
            setTrackState((ps) => {
                return { ...ps, audio: !ps.audio };
            });
        } else if (type === "video") {
            await tracks[1].setEnabled(!trackState.video);
            setTrackState((ps) => {
                return { ...ps, video: !ps.video };
            });
        }
    };

    const leaveChannel = async () => {
        await client.leave();
        client.removeAllListeners();
        tracks[0].close();
        tracks[1].close();
        setStart(false);
        socket?.emit("requestEndCall", user?._id);
    };

    useEffect(() => {
        return () => {
            leaveChannel();
        };
    }, []);

    useEffect(() => {
        socket?.on("closeCall", (res: { roomId: string }) => {
            leaveChannel();
            history.push("/");
        });
    }, [socket]);

    return (
        <div className={classes.root}>
            <button
                className={cn(classes.btn, {
                    [classes.on]: trackState.audio,
                })}
                onClick={() => mute("audio")}
            >
                {trackState.audio ? (
                    <AiOutlineAudio />
                ) : (
                    <AiOutlineAudioMuted />
                )}
            </button>
            <button
                className={cn(classes.btn, {
                    [classes.on]: trackState.video,
                })}
                onClick={() => mute("video")}
            >
                {trackState.video ? <FaVideo /> : <FaVideoSlash />}
            </button>
            <button
                className={classes.leave}
                onClick={() => {
                    history.push("/");
                }}
            >
                Leave
            </button>
        </div>
    );
};

export default Controls;

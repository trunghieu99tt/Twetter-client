import { useAppContext } from "@context/app.context";
import { useUser } from "@talons/useUser";
import { MediaConnection } from "peerjs";
import React, {
    MutableRefObject,
    RefObject,
    useEffect,
    useRef,
    useState,
} from "react";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { callState } from "states/call.state";

// Styles
import classes from "./callModal.module.css";

interface Props {}

const CallModal = (props: Props) => {
    const [call, setCall] = useRecoilState(callState);
    const { user } = useUser();
    const {
        state: { peer, socket },
    } = useAppContext();

    const [answer, setAnswer] = useState<boolean>(false);
    const [callDuration, setCallDuration] = useState<number>(0);
    const [newCall, setNewCall] = useState<MediaConnection | null>(null);

    const tracks = useRef([]) as MutableRefObject<MediaStreamTrack[]>;
    const myVideoRef = useRef() as MutableRefObject<HTMLVideoElement>;
    const remoteVideoRef = useRef() as MutableRefObject<HTMLVideoElement>;

    // Open stream
    const openStream = async (video: boolean) => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: video,
        });
        tracks.current = stream.getTracks();
        return stream;
    };

    // play stream
    const playStream = (stream: MediaStream, video: HTMLVideoElement) => {
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
            video.play();
        });
    };

    // Close stream
    const closeStream = () => {
        tracks?.current?.forEach((track) => track.stop());
        if (newCall) newCall.close();
    };

    // reset states
    const reset = () => {
        closeStream();
        setCall(null);
        setAnswer(false);
        setCallDuration(0);
        setNewCall(null);
    };

    // end call
    const endCall = () => {
        reset();
        socket?.emit("endCall", call);
    };

    // handle open peer connection
    const onPeerConnection = async (newCall: MediaConnection | null) => {
        const stream = await openStream(call.video);
        if (myVideoRef?.current) {
            playStream(stream, myVideoRef.current);
        }
        if (newCall) {
            newCall.answer(stream);
        } else {
            newCall = peer?.call(call.peerId, stream) as MediaConnection;
        }
        newCall.on("stream", (stream) => {
            if (remoteVideoRef?.current) {
                playStream(stream, remoteVideoRef.current);
            }
        });
        setNewCall(newCall);
        setAnswer(true);
    };

    // answer call
    const answerCall = async () => {
        onPeerConnection(null);
    };

    useEffect(() => {
        peer?.on("call", async (newCall: MediaConnection) => {
            onPeerConnection(newCall);
        });
    }, [peer, call]);

    useEffect(() => {
        socket?.on("callDisconnected", () => {
            reset();
        });
    }, [socket, call, newCall, tracks.current]);

    return (
        <div className={classes.root}>
            <div className={classes.inner}>
                {!answer && (
                    <section className={classes.callBox}>
                        <div className={classes.info}>
                            <img
                                src={user?.avatar}
                                alt={user?.name}
                                className={classes.remoteAvatar}
                            />
                            <h4 className={classes.remoteName}>{user?.name}</h4>
                            {/* <div>{convertDuration(callDuration)}</div> */}
                            <div>
                                {call?.video ? "Video call" : "Audio call"}
                            </div>
                        </div>
                        <div className={classes.callMenu}>
                            {call && user._id === call.guestId && (
                                <button
                                    className={classes.answerBtn}
                                    onClick={answerCall}
                                >
                                    Answer
                                </button>
                            )}
                            <button
                                className={classes.endCallBtn}
                                onClick={endCall}
                            >
                                <HiOutlinePhoneMissedCall />
                            </button>
                        </div>
                    </section>
                )}
                <section
                    className={classes.answerSection}
                    style={{
                        display: answer ? "block" : "none",
                    }}
                >
                    <div className={classes.videoList}>
                        <video
                            ref={(r: HTMLVideoElement) =>
                                (myVideoRef.current = r)
                            }
                            className={classes.myVideo}
                            playsInline
                            muted
                        />
                        <video
                            ref={(r: HTMLVideoElement) =>
                                (remoteVideoRef.current = r)
                            }
                            className={classes.remoteVideo}
                            playsInline
                        />
                    </div>
                    <div className={classes.timeVideo}>
                        {/* {convertDuration(callDuration)} */}
                    </div>
                    <button className={classes.endCallBtn} onClick={endCall}>
                        <HiOutlinePhoneMissedCall />
                    </button>
                </section>
            </div>
        </div>
    );
};

export default CallModal;

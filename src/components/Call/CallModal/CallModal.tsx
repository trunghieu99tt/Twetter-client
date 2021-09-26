import { useAppContext } from "@context/app.context";
import { useUser } from "@talons/useUser";
import { MediaConnection } from "peerjs";
import React, { useEffect, useState } from "react";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";
import { useRecoilState, useRecoilValue } from "recoil";
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
    const [tracks, setTracks] = useState<MediaStreamTrack[] | null>(null);
    const [newCall, setNewCall] = useState<MediaConnection | null>(null);

    const myVideoRef = React.useRef<HTMLVideoElement>(null);
    const remoteVideoRef = React.useRef<HTMLVideoElement>(null);

    // open stream
    const openStream = (video: any) => {
        return navigator.mediaDevices.getUserMedia({
            video,
            audio: true,
        });
    };

    // play stream
    const playStream = (stream: any, video: any) => {
        if (video) {
            video.srcObject = stream;
            video.play();
        }
    };

    // end call
    const endCall = () => {
        tracks?.forEach((track: MediaStreamTrack) => {
            track.stop();
        });
        if (newCall) {
            console.log(`newCall.close`, newCall.close);
            newCall.close();
        }
        const callTime = answer ? callDuration : 0;
        console.log(`call`, call);
        socket?.emit("endCall", {
            ...call,
            callTime,
        });
        setCall(null);
    };

    // answer call
    const answerCall = () => {
        openStream(call.video).then((stream) => {
            playStream(stream, myVideoRef.current);
            const tracks = stream.getTracks();
            setTracks(tracks);

            const newCall = peer && peer.call(call.peerId, stream);
            newCall &&
                newCall.on("stream", (remoteStream: any) => {
                    playStream(remoteStream, remoteVideoRef.current);
                });

            setAnswer(true);
            setNewCall(newCall);
        });
    };

    // convert call duration to hours, minutes and seconds
    const convertDuration = (duration: number) => {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration - hours * 3600) / 60);
        const seconds = duration - hours * 3600 - minutes * 60;
        return `${hours}:${minutes}:${seconds}`;
    };

    // set call duration
    useEffect(() => {
        const setTime = setInterval(() => {
            setCallDuration((prevCallDuration) => prevCallDuration + 1);
        }, 1000);
        return () => clearInterval(setTime);
    });

    // play - pause audio
    const playAudio = (audio: any) => {
        audio.play();
    };

    const pauseAudio = (audio: any) => {
        audio.pause();
        audio.currentTime = 0;
    };

    // on call event
    useEffect(() => {
        peer?.on("call", (newCall: MediaConnection) => {
            openStream(call.video).then((stream) => {
                if (myVideoRef.current) {
                    playStream(stream, myVideoRef.current);
                }
                const tracks = stream.getTracks();
                setTracks(tracks);
                newCall.answer(stream);
                newCall.on("stream", (remoteStream: any) => {
                    if (remoteVideoRef) {
                        playStream(remoteStream, remoteVideoRef.current);
                    }
                });
                setNewCall(newCall);
                setAnswer(true);
            });
        });
    }, [peer, call]);

    // on disconnect event
    useEffect(() => {
        socket?.on("callDisconnected", () => {
            tracks?.forEach((track: MediaStreamTrack) => {
                track.stop();
            });
            if (newCall) {
                newCall.close();
            }
            setCall(null);
        });

        return () => {
            socket?.off("callDisconnected");
        };
    }, [socket, tracks, newCall]);

    // user offline event
    useEffect(() => {
        socket?.on("callingUserIsOffline", () => {
            console.log("User is offline");
            endCall();
        });
    }, [socket]);

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
                            <div>{convertDuration(callDuration)}</div>
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
                        display: answer ? "grid" : "none",
                    }}
                >
                    <div className={classes.videoList}>
                        <video
                            ref={myVideoRef}
                            className={classes.myVideo}
                            playsInline
                            muted
                        />
                        <video
                            ref={remoteVideoRef}
                            className={classes.remoteVideo}
                            playsInline
                        />
                    </div>
                    <div className={classes.timeVideo}>
                        {convertDuration(callDuration)}
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

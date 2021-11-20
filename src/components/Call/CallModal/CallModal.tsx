import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { FiPhoneCall } from "react-icons/fi";
import Peer, { SignalData } from "simple-peer";

// talons
import { useUser } from "@talons/useUser";

// context
import { useAppContext } from "@context/app.context";

// states
import { callState } from "states/call.state";

// images
import DefaultUnknownAvatar from "@images/user.png";

// icons
import { HiOutlinePhoneMissedCall } from "react-icons/hi";

// Styles
import classes from "./callModal.module.css";
import styled from "styled-components";

interface Props {}

let callTimeInterval: NodeJS.Timeout | null = null;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2,
};

const Video = (props: any) => {
    const ref = useRef() as MutableRefObject<HTMLVideoElement>;

    useEffect(() => {
        props.peer.on("stream", (stream: MediaStream) => {
            if (ref?.current) {
                ref.current.srcObject = stream;
            }
        });
    }, [ref]);

    return <StyledVideo playsInline autoPlay ref={ref} />;
};

const CallModal = (props: Props) => {
    const [call, setCall] = useRecoilState(callState);
    const [answer, setAnswer] = useState(false);
    const { user } = useUser();
    const {
        state: { socket },
    } = useAppContext();

    const [callDuration, setCallDuration] = useState<number>(0);
    const [peers, setPeers] = useState<any[]>([]);

    const myVideoRef = useRef() as MutableRefObject<HTMLVideoElement>;
    const peersRef = useRef<any[]>([]);

    const createPeer = (
        otherUserId: string,
        currentUserId: string,
        stream: MediaStream
    ) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal: SignalData) => {
            socket?.emit("sendingSignal", {
                signal,
                otherUserId,
                currentUserId,
            });
        });

        return peer;
    };

    const addPeer = (
        inComingSignal: SignalData,
        callerId: string,
        stream: MediaStream
    ) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal: SignalData) => {
            socket?.emit("returningSignal", {
                signal,
                userToSignal: callerId,
                callerId,
            });
        });

        peer.signal(inComingSignal);

        return peer;
    };

    // end call
    const endCall = () => {
        setCall(null);
        peersRef.current.forEach((peerItem) => {
            const { peerId, peer } = peerItem;
            if (peerId === user?._id && peer) {
                peer.destroy();
            }
        });
        peersRef.current.filter((peerItem) => peerItem.peerId !== user?._id);
        socket?.emit("endCall", user._id);
    };

    const handleCloseCall = () => {
        // set call to null
        setCall(null);

        // close all peers
        peers?.forEach((peer) => peer?.destroy());
        peersRef.current = [];
    };

    const handleRemovePeerOfUser = (userId: string) => {
        const newPeers = peers.filter((peerItem) => peerItem.peerId !== userId);
        setPeers(newPeers);
    };

    // convert call duration to seconds, minutes and hours
    const convertDuration = () => {
        const hours = Math.floor(callDuration / 3600);
        const minutes = (Math.floor((callDuration % 3600) / 60) + "").padStart(
            2,
            "0"
        );
        const seconds = ((callDuration % 60) + "").padStart(2, "0");
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    // start call interval
    useEffect(() => {
        callTimeInterval = setInterval(() => {
            setCallDuration((val) => val + 1);
        }, 1000);

        return () => {
            if (callTimeInterval) clearInterval(callTimeInterval);
        };
    }, []);

    // stop call interval after 15 seconds if no answer
    useEffect(() => {
        if (callDuration > 15 && !answer) {
            toast.error("No answer");
            endCall();
        }
    }, [callDuration]);

    // when user answer, reset call duration
    useEffect(() => {
        if (answer) {
            setCallDuration(0);
        }
    }, [answer]);

    const handleAnswer = () => {
        setAnswer(true);
        socket?.emit("requestJoinRoom", {
            userId: user._id,
            roomId: call.room._id,
        });
    };

    useEffect(() => {
        if (socket) {
            navigator.mediaDevices
                .getUserMedia({
                    video: videoConstraints,
                    audio: true,
                })
                .then((stream: MediaStream) => {
                    myVideoRef.current.srcObject = stream;
                    console.log(`stream`, stream);
                    socket.on("usersInRoomChanged", (userIds) => {
                        const newPeers: any[] = [];
                        console.log(`userIds`, userIds);
                        userIds.forEach((otherUserId: string) => {
                            const peer = createPeer(
                                otherUserId,
                                user._id,
                                stream
                            );
                            newPeers.push(peer);
                            peersRef.current.push({
                                peerId: otherUserId,
                                peer,
                            });
                        });

                        console.log("newPeers: ", newPeers);

                        if (newPeers.length > 1) {
                            console.log("Go set answer true");
                            setAnswer(true);
                        }
                        setPeers(newPeers);
                    });

                    socket.on("userJoined", (payload) => {
                        const peer = addPeer(
                            payload.signal,
                            payload.callerId,
                            stream
                        );

                        peersRef.current.push({
                            peerId: payload.callerId,
                            peer,
                        });

                        setPeers((prevPeers) => [...prevPeers, peer]);
                    });

                    socket.on("receivingReturnedSignal", (payload) => {
                        const item = peersRef.current.find(
                            (p: any) => p.peerId === payload.callerId
                        );
                        if (item) {
                            item.peer.signal(payload.signal);
                        }
                    });
                });
            socket.on("closeCall", () => {
                handleCloseCall();
            });

            socket.on("userLeft", (userId) => {
                handleRemovePeerOfUser(userId);
            });
        }
    }, []);

    const myCall = call?.senderId === user?._id;

    return (
        <div className={classes.root}>
            <div className={classes.inner}>
                {!answer && (
                    <section className={classes.callBox}>
                        <div className={classes.info}>
                            <img
                                src={user?.avatar || DefaultUnknownAvatar}
                                alt={user?.name}
                                className={classes.remoteAvatar}
                            />
                            <h4 className={classes.remoteName}>{user?.name}</h4>
                            <div className={classes.callDuration}>
                                {convertDuration()}
                            </div>

                            <div className={classes.callDescription}>
                                {!myCall && <p>Incoming </p>}
                                {call?.video ? "Video call" : "Audio call"}
                            </div>
                        </div>
                        <div className={classes.callMenu}>
                            {call && user._id !== call.senderId && (
                                <button
                                    className={classes.answerCallBtn}
                                    onClick={handleAnswer}
                                >
                                    <FiPhoneCall />
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
                        <StyledVideo
                            muted
                            ref={myVideoRef}
                            autoPlay
                            playsInline
                        />
                        {peers?.map((peer) => {
                            return <Video key={peer.peerId} peer={peer} />;
                        })}
                    </div>
                    <div className={classes.timeVideo}>{convertDuration()}</div>
                    <button className={classes.endCallBtn} onClick={endCall}>
                        <HiOutlinePhoneMissedCall />
                    </button>
                </section>
            </div>
        </div>
    );
};

export default CallModal;

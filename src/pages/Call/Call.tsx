import { MutableRefObject, useEffect, useRef, useState } from "react";
import Peer, { SignalData } from "simple-peer";
import styled from "styled-components";
import { useHistory, useParams } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";

// talons
import { useUser } from "@talons/useUser";

// context
import { useAppContext } from "@context/app.context";

// icons
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { MdVideocamOff, MdVideocam } from "react-icons/md";

// states
import { iUser } from "@type/user.types";
import { callState } from "states/call.state";
import { connectedRoomSelector } from "states/room.state";

const Container = styled.div`
    height: 100vh;
    width: 20%;
`;

const Controls = styled.div`
    margin: 3px;
    padding: 5px;
    height: 27px;
    width: 98%;
    background-color: rgba(255, 226, 104, 0.1);
    margin-top: -8.5vh;
    filter: brightness(1);
    z-index: 1;
    border-radius: 6px;
`;

const ControlSmall = styled.div`
    margin: 3px;
    padding: 5px;
    height: 16px;
    width: 98%;
    margin-top: -6vh;
    filter: brightness(1);
    z-index: 1;
    border-radius: 6px;
    display: flex;
    justify-content: center;
`;

const StyledVideo = styled.video`
    width: 100%;
    position: static;
    border-radius: 10px;
    overflow: hidden;
    margin: 1px;
    border: 5px solid gray;
`;

type PeerObj = {
    peerID: string;
    peer: any;
};

const Video = (props: any) => {
    const ref = useRef() as MutableRefObject<HTMLVideoElement>;

    useEffect(() => {
        props?.peer?.on("stream", (stream: MediaStream) => {
            if (ref?.current) {
                ref.current.srcObject = stream;
            }
        });
    }, [ref]);

    return <StyledVideo playsInline autoPlay ref={ref} />;
};

const Call = () => {
    const params: {
        roomId: string;
    } = useParams();
    const history = useHistory();

    const { roomId } = params;

    const {
        state: { socket },
    } = useAppContext();
    const { user } = useUser();
    const currentRoom = useRecoilValue(connectedRoomSelector(roomId));
    const setCall = useSetRecoilState(callState);

    const [peers, setPeers] = useState<PeerObj[]>([]);
    const [audioFlag, setAudioFlag] = useState(true);
    const [videoFlag, setVideoFlag] = useState(true);
    const [userUpdate, setUserUpdate] = useState<
        {
            id: string;
            audioFlag: boolean;
            videoFlag: boolean;
        }[]
    >([]);

    const peersRef = useRef<PeerObj[]>([]);
    const otherIdsRef = useRef<string[]>([]);
    const hasNotRenderVideosYet = useRef(true);
    const userVideo = useRef() as MutableRefObject<HTMLVideoElement>;

    const videoConstraints = {
        minAspectRatio: 1.333,
        minFrameRate: 60,
        height: window.innerHeight / 1.8,
        width: window.innerWidth / 2,
    };

    const isUserRoomMember = () => {
        if (!currentRoom) {
            return false;
        }
        return currentRoom.members.some(
            (member: iUser) => member._id === user._id
        );
    };

    const destroyPeersAndStopTracks = () => {
        // peersRef.current.forEach((peerObj: PeerObj) => {
        //     peerObj.peer?.destroy();
        // });
        if (userVideo?.current?.srcObject) {
            (userVideo.current.srcObject as MediaStream)
                ?.getTracks()
                .forEach(function (track: MediaStreamTrack) {
                    track.stop();
                });
        }
        // peersRef.current = [];
    };

    const endCall = () => {
        destroyPeersAndStopTracks();
        if (socket) {
            socket.emit("requestEndCall", user._id);
        }
    };

    useEffect(() => {
        window.onbeforeunload = () => {
            endCall();
        };

        console.log("peer refs: ", peersRef);

        createStream();
        setCall(null);

        return () => {
            endCall();
            socket?.off("otherUsersInRoom");
            socket?.off("userJoined");
            socket?.off("receivingReturnedSignal");
            socket?.off("userLeft");
            socket?.off("userChangeSetting");
        };
    }, []);

    const createPeersForOtherMembers = (
        otherUserIds: string[],
        stream: MediaStream
    ) => {
        const newPeers: any = [];

        otherUserIds.forEach((otherUserId: string) => {
            if (otherUserId !== user._id) {
                const peer = createPeer(otherUserId, user._id, stream);
                peersRef.current.push({
                    peerID: otherUserId,
                    peer,
                });
                newPeers.push({
                    peerID: otherUserId,
                    peer,
                });
            }
        });
        setPeers(newPeers);
        otherIdsRef.current = otherUserIds;
    };

    const createPeerForNewUser = (
        signal: SignalData,
        newUserId: string,
        stream: MediaStream
    ) => {
        const peer = addPeer(signal, newUserId, stream);

        peersRef.current.push({
            peerID: newUserId,
            peer,
        });

        setPeers(peersRef.current);
    };

    const replySignalOfNewMember = (
        signalOwnerId: string,
        signal: SignalData
    ) => {
        const newPeerRefs: PeerObj[] = [];

        const exists: {
            [key: string]: boolean;
        } = {};

        peersRef.current.forEach((peerObj: PeerObj) => {
            if (peerObj.peerID === signalOwnerId) {
                try {
                    peerObj.peer?.signal(signal);
                    newPeerRefs.push(peerObj);
                    if (!exists[peerObj.peerID]) {
                        exists[peerObj.peerID] = true;
                    }
                } catch (error) {
                    console.log("error: ", error);
                }
            } else {
                newPeerRefs.push(peerObj);
                if (!exists[peerObj.peerID]) {
                    exists[peerObj.peerID] = true;
                }
            }
        });

        if (newPeerRefs.length !== peersRef.current.length) {
            peersRef.current = newPeerRefs;
            setPeers(newPeerRefs);
        }
    };

    const onUserLeft = (userId: string) => {
        const peerObj = peersRef.current.find((p) => p.peerID === userId);
        if (peerObj) {
            peerObj.peer.destroy();
        }
        const peers = peersRef.current.filter((p) => p.peerID !== userId);
        const newOtherIds = otherIdsRef.current.filter((id) => id !== userId);
        otherIdsRef.current = newOtherIds;
        peersRef.current = peers;
        setPeers(peers);
    };

    const createStream = () => {
        if (socket && userVideo?.current) {
            hasNotRenderVideosYet.current = false;
            navigator.mediaDevices
                .getUserMedia({ video: videoConstraints, audio: true })
                .then((stream) => {
                    if (userVideo.current) {
                        userVideo.current.srcObject = stream;
                        socket.emit("requestJoinRoom", {
                            roomId,
                            userId: user._id,
                        });
                        socket.on("otherUsersInRoom", (userIds: string[]) => {
                            console.log("other user in room: ", userIds);
                            console.log("current user: ", user._id);
                            console.log("socket id: ", socket.id);
                            createPeersForOtherMembers(userIds, stream);
                        });

                        socket.on("userJoined", (payload) => {
                            const { newUserId } = payload;
                            console.log("otherUserIds: ", otherIdsRef.current);
                            console.log("currentUserId: ", user._id);

                            if (
                                !otherIdsRef?.current?.includes(newUserId) &&
                                user._id !== payload.newUserId
                            ) {
                                console.log("userid: ", user._id);
                                console.log(`payload userJoined`, payload);
                                console.log("socketid: ", socket.id);

                                createPeerForNewUser(
                                    payload.signal,
                                    payload.newUserId,
                                    stream
                                );
                            }
                        });
                        socket.on("receivingReturnedSignal", (payload) => {
                            replySignalOfNewMember(
                                payload.signalOwnerId,
                                payload.signal
                            );
                        });
                        socket.on("userLeft", onUserLeft);
                        socket.on("userChangeSetting", (payload) => {
                            setUserUpdate(payload);
                        });
                    }
                });

            socket.on("closeCall", () => {
                destroyPeersAndStopTracks();
                history.push("/");
            });
        }
    };
    const createPeer = (
        targetUserId: string,
        currentUserId: string,
        stream: MediaStream
    ) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer._debug = console.log;

        console.log("sending signal payload: ", {
            targetUserId,
            currentUserId,
        });

        peer.on("signal", (signal: SignalData) => {
            socket?.emit("sendingSignal", {
                signal,
                targetUserId,
                currentUserId,
            });
        });

        return peer;
    };

    const addPeer = (
        inComingSignal: SignalData,
        newUserId: string,
        stream: MediaStream
    ) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });
        peer._debug = console.log;

        // when we get a signal from the other user, we need to send it to new user
        peer.on("signal", (signal: SignalData) => {
            socket?.emit("returningSignal", {
                signal,
                newUserId,
                signalOwnerId: user._id,
            });
        });

        peer.signal(inComingSignal);

        return peer;
    };

    const toggleTrack = (type = "video") => {
        if (userVideo.current?.srcObject) {
            const tracks = (
                userVideo.current.srcObject as MediaStream
            ).getTracks();
            tracks.forEach((track) => {
                if (track.kind === type) {
                    track.enabled = !track.enabled;
                    socket?.emit("userChangeSetting", {
                        roomId,
                        currentUserId: user._id,
                        data: [
                            ...userUpdate,
                            {
                                id: user._id,
                                videoFlag:
                                    type === "video"
                                        ? track.enabled
                                        : videoFlag,
                                audioFlag:
                                    type === "audio"
                                        ? track.enabled
                                        : audioFlag,
                            },
                        ],
                    });
                    if (type === "video") {
                        setVideoFlag(track.enabled);
                    } else {
                        setAudioFlag(track.enabled);
                    }
                }
            });
        }
    };

    console.log("peers: ", peers);

    return (
        <Container>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            <Controls>
                <button
                    onClick={() => {
                        toggleTrack("video");
                    }}
                >
                    {videoFlag ? <MdVideocam /> : <MdVideocamOff />}
                </button>
                <button
                    onClick={() => {
                        toggleTrack("audio");
                    }}
                >
                    {audioFlag ? <BsFillMicFill /> : <BsFillMicMuteFill />}
                </button>
            </Controls>
            {peers.map((peer, index) => {
                if (peer.peerID === user._id) return null;

                let audioFlagTemp = true;
                let videoFlagTemp = true;
                if (userUpdate) {
                    userUpdate.forEach((entry) => {
                        if (peer && peer.peerID && peer.peerID === entry.id) {
                            audioFlagTemp = entry.audioFlag;
                            videoFlagTemp = entry.videoFlag;
                        }
                    });
                }

                console.log(`peer`, peer);

                // check if we have peer with peerId before

                return (
                    <div key={peer.peerID}>
                        <Video peer={peer.peer} />
                        <ControlSmall>
                            {videoFlagTemp ? <MdVideocam /> : <MdVideocamOff />}
                            &nbsp;&nbsp;&nbsp;
                            {audioFlagTemp ? (
                                <BsFillMicFill />
                            ) : (
                                <BsFillMicMuteFill />
                            )}
                        </ControlSmall>
                    </div>
                );
            })}
        </Container>
    );
};

export default Call;

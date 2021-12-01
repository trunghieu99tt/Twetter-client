import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router";

// talons
import { useUser } from "@talons/useUser";

// states
import { callState } from "states/call.state";

// images
import DefaultUnknownAvatar from "@images/user.png";

// icons
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";

// Styles
import classes from "./callModal.module.css";
import { useAppContext } from "@context/app.context";

let callTimeInterval: NodeJS.Timeout | null = null;

const CallModal = () => {
    const history = useHistory();
    const [call, setCall] = useRecoilState(callState);
    const { user } = useUser();

    const {
        state: { socket },
    } = useAppContext();

    const [callDuration, setCallDuration] = useState<number>(0);

    // end call
    const endCall = () => {
        setCall(null);
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
        if (callDuration > 15) {
            toast.error("No answer");
            endCall();
        }
    }, [callDuration]);

    const handleAnswer = () => {
        socket?.emit("answerCall", {
            userRepliedId: user._id,
            ownerCallId: call.senderId,
            roomId: call.room._id,
        });
        history.push(`/call/${call.room._id}`);
    };

    const myCall = call?.senderId === user?._id;

    return (
        <div className={classes.root}>
            <div className={classes.inner}>
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
            </div>
        </div>
    );
};

export default CallModal;

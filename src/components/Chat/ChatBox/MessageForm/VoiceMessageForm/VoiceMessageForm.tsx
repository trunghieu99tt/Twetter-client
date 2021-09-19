import React from "react";
import { useRef } from "react";
import { ReactMic } from "react-mic";
import ReactPlayer from "react-player";

// hooks
import { useOnClickOutside } from "@hooks/useOnClickOutside";

// talons
import { useVoiceMessageForm } from "./useVoiceMessageForm";

// types
import { FiSend } from "react-icons/fi";
import { CgRecord } from "react-icons/cg";
import { FaRegStopCircle } from "react-icons/fa";

// styles
import classes from "./voicemessageform.module.css";
import { Root, ButtonGroup, Button } from "./VoiceMessageStyle";

interface Props {
    classes?: object;
    closeRecord: (value: boolean) => void;
}

const VoiceMessageForm = ({ classes: propsClasses, closeRecord }: Props) => {
    const {
        recording,
        recordData,
        onRecordData,
        onStopRecord,
        sendAudio,
        startRecording,
        stopRecording,
    } = useVoiceMessageForm();

    const voiceRecorderRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    useOnClickOutside(voiceRecorderRef, () => closeRecord(false));

    return (
        <Root ref={voiceRecorderRef}>
            {recordData && (
                <ReactPlayer
                    url={recordData.blobURL}
                    height="2rem"
                    width="100%"
                    playing
                />
            )}
            <ReactMic
                record={recording}
                className={classes.recordSoundwave}
                onStop={onStopRecord}
                onData={onRecordData}
                strokeColor="#fff"
            />
            <ButtonGroup>
                <Button onClick={startRecording}>
                    <CgRecord />
                </Button>
                <Button onClick={stopRecording}>
                    <FaRegStopCircle />
                </Button>
                {recordData && (
                    <Button onClick={sendAudio}>
                        <FiSend />
                    </Button>
                )}
            </ButtonGroup>
        </Root>
    );
};

export default VoiceMessageForm;

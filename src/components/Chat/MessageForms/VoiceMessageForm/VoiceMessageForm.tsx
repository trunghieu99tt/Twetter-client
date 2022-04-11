import React, { useRef } from "react";
import { ReactMic } from "react-mic";
import ReactPlayer from "react-player";

// talons
import { useVoiceMessageForm } from "./useVoiceMessageForm";
import { useOnClickOutside } from "@hooks/useOnClickOutside";

// utils
import mergeClasses from "@utils/mergeClasses";

// icons
import { FiSend } from "react-icons/fi";
import { CgRecord } from "react-icons/cg";
import { FaRegStopCircle } from "react-icons/fa";

// styles
import defaultClasses from "./voicemessageform.module.css";
import { useParams } from "react-router";

interface Props {
  classes?: Record<string, any>;
  closeRecord: (value: boolean) => void;
}

const VoiceMessageForm = ({ classes: propsClasses, closeRecord }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

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
    <div className={classes.root} ref={voiceRecorderRef}>
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
        backgroundColor={"var(---mGray1)"}
      />
      <div className={classes.btnGroup}>
        <button className={classes.btn} onClick={startRecording} type="button">
          <CgRecord />
        </button>
        <button className={classes.btn} onClick={stopRecording} type="button">
          <FaRegStopCircle />
        </button>
        {recordData && (
          <button className={classes.btn} onClick={sendAudio} type="button">
            <FiSend />
          </button>
        )}
      </div>
    </div>
  );
};

export default VoiceMessageForm;

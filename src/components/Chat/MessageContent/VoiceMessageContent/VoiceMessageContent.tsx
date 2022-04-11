import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";

// utils
import mergeClasses from "@utils/mergeClasses";

// icons
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";

// styles
import defaultClasses from "./voicemessagecontent.module.css";

interface Props {
  classes?: Record<string, any>;
  url: string;
}

type TProgress = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

const VoiceMessageContent = ({ classes: propsClasses, url }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const fileRef = useRef<any>(null);

  const [playing, setPlaying] = useState<boolean>(false);

  const onEnded = () => setPlaying(false);

  const onPlay = () => {
    console.log("Playing");
  };

  const togglePlay = () => setPlaying((value) => !value);

  return (
    <div className={classes.root}>
      <ReactPlayer
        ref={fileRef}
        key={Math.random()}
        url={url}
        loop={false}
        playing={playing}
        onPlay={onPlay}
        onEnded={onEnded}
        width={0}
        height={0}
        style={{
          display: "none",
        }}
      ></ReactPlayer>

      <div className={classes.wrapper}>
        <button className={classes.controlBtn} onClick={togglePlay}>
          {playing ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
        </button>
      </div>
    </div>
  );
};

export default VoiceMessageContent;

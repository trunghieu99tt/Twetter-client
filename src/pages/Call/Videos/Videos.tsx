import { AgoraVideoPlayer } from "agora-rtc-react";
import {
    IAgoraRTCRemoteUser,
    ICameraVideoTrack,
    IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";

import classes from "./videos.module.css";

interface Props {
    users: IAgoraRTCRemoteUser[];
    tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}

const Videos = ({ users, tracks }: Props) => {
    return (
        <div className={classes.root}>
            <AgoraVideoPlayer
                className={classes.myVideo}
                videoTrack={tracks[1]}
            />
            <div className={classes.otherVideos}>
                {users.length > 0 &&
                    users.map((user) => {
                        console.log(`user`, user);
                        if (user.videoTrack) {
                            return (
                                <AgoraVideoPlayer
                                    className={classes.video}
                                    // className="vid"
                                    videoTrack={user.videoTrack}
                                    key={user.uid}
                                />
                            );
                        }
                        return <div>Turning off camera</div>;
                    })}
            </div>
        </div>
    );
};

export default Videos;

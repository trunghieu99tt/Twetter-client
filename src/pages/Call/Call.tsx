import { useEffect } from "react";
import { useParams } from "react-router";
import { useSetRecoilState } from "recoil";
import { callState } from "states/call.state";
import VideoCall from "./VideoCall";

const Call = () => {
    const params: {
        roomId: string;
    } = useParams();

    const setCall = useSetRecoilState(callState);
    const { roomId } = params;

    useEffect(() => {
        setCall(null);
    }, []);

    return (
        <div>
            <VideoCall channelName={roomId} />
        </div>
    );
};

export default Call;

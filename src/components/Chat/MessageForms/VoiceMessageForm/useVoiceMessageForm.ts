/* eslint-disable react-hooks/exhaustive-deps */
import { useFirebase } from "@talons/useFirebase";
import { useUser } from "@talons/useUser";
import { iNewMessage } from "@type/message.types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSetRecoilState } from "recoil";
import { newMessageState } from "states/message.state";

const useVoiceMessageForm = () => {
    const params: any = useParams();
    const { roomId } = params;

    const { user: currentUser } = useUser();
    const setNewMessage = useSetRecoilState(newMessageState);

    const [recording, setRecording] = useState<boolean>(false);
    const [recordData, setRecordData] = useState<any>(null);

    const { uploadToStorage, fileUrl, setFileUrl } = useFirebase();

    useEffect(() => {
        if (fileUrl) {
            sendMessage();
        }
    }, [fileUrl]);

    const startRecording = () => {
        setRecording(true);
    };

    const stopRecording = () => {
        setRecording(false);
    };

    const onRecordData = (recordedBlob: any) => {
        console.log("chunk of real-time data is: ", recordedBlob);
    };

    const onStopRecord = (recordedBlob: any) => {
        setRecordData(recordedBlob);
    };

    const sendAudio = () => {
        if (!recordData) return;
        uploadToStorage(recordData.blobURL);
    };

    const sendMessage = async () => {
        if (fileUrl) {
            const newMessage: iNewMessage = {
                author: currentUser,
                content: "",
                roomId,
                file: fileUrl,
            };
            setNewMessage(newMessage);
        }
        setFileUrl(null);
        setRecordData(null);
        setRecording(false);
    };

    return {
        recording,
        recordData,
        startRecording,
        stopRecording,
        onRecordData,
        onStopRecord,
        sendAudio,
    };
};

export { useVoiceMessageForm };

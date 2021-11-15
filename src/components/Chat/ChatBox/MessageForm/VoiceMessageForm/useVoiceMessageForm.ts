/* eslint-disable react-hooks/exhaustive-deps */
import { useFirebase } from "@talons/useFirebase";
import { useEffect, useState } from "react";

const useVoiceMessageForm = () => {
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
        const newMessage = {};
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

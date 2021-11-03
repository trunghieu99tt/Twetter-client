import { useState } from "react";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";

// states
import { connectedRoomsState } from "states/room.state";

// types
import { iRoom } from "@type/room.types";
import { iMessage } from "@type/message.types";


export const useChatBox = () => {
    const channels = useRecoilValue(connectedRoomsState);
    const params: any = useParams();
    const { id } = params;

    const [message, setMessage] = useState<EditorState>(EditorState.createEmpty());
    const [chosenEmoji, setChosenEmoji] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [messageImage, setMessageImage] = useState<{
        file: File | null,
        url: string,
    }>({
        file: null,
        url: ""
    });

    const currentChannel = channels?.find((e: iRoom) => e._id === id);

    let channelImages: string[] = [];

    currentChannel?.messages.forEach((message: iMessage) => {
        const isImage = message.file && message.file.endsWith('jpg');
        if (isImage && message.file) {
            channelImages.push(message.file);
        }
    });

    // useEffect(() => {
    //     if (chosenEmoji) {
    //         const newMessage = `${message} ${chosenEmoji!.emoji}`;
    //         setMessage(newMessage);
    //         setChosenEmoji(null);
    //     }
    // }, [chosenEmoji]);

    const resetMessage = () => {
        const editorState = EditorState.push(message, ContentState.createFromText(''), 'remove-range');
        setMessage(editorState);
    };

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const messageRaw = JSON.stringify(convertToRaw(message.getCurrentContent()));
        if (!messageImage.file) {
            if (messageRaw.length > 0) {
                resetMessage();
            }
        }
        else {
            onCloseImageMessageForm();
            resetMessage();
        }
        setLoading(false);
    };

    const onChange = (event: any, file = false) => {
        if (file) {
            const file = event.target.files[0];
            const newPhoto = {
                file,
                url: URL.createObjectURL(file)
            };
            setMessageImage(newPhoto);
        }
    };

    const onCloseImageMessageForm = () => {
        setMessageImage({
            file: null,
            url: ''
        });
    };

    return {
        message,
        loading,
        chosenEmoji,
        messageImage,
        channelImages,
        currentChannel,

        onSubmit,
        onChange,
        setMessage,
        setChosenEmoji,
        onCloseImageMessageForm,
    };
};

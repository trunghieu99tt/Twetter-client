import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";

import { useUser } from "@talons/useUser";
import { useSocket } from "socket/useSocket";
import { useUpload } from "@talons/useUpload";

// states
import { roomState } from "states/room.state";

// types
import { iRoom } from "@type/room.types";
import { iUser } from "@type/user.types";
import { iMessage } from "@type/message.types";
import { ContentState, convertToRaw, EditorState } from "draft-js";


export const useChatBox = () => {
    const channels = useRecoilValue(roomState);
    const params: any = useParams();
    const { uploadImage } = useUpload();
    const { user: currentUser } = useUser();
    const { addMessage, joinRoom } = useSocket();
    const { id } = params;

    const [messages, setMessages] = useState<{ [key: string]: iMessage[] } | null>(null);
    const [message, setMessage] = useState<EditorState>(EditorState.createEmpty());
    const [chosenEmoji, setChosenEmoji] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [messageImage, setMessageImage] = useState<{
        file: File | null,
        url: string,
    }>({
        file: null,
        url: ""
    })

    const currentChannel = channels?.find((e: iRoom) => e._id === id);

    let channelImages: string[] = [];

    currentChannel?.messages.forEach((message: iMessage) => {
        const isImage = message.file && message.file.endsWith('jpg');
        if (isImage && message.file) {
            channelImages.push(message.file);
        }
    })

    useEffect(() => {
        return () => {
            joinChannel();
        }
    }, []);

    useEffect(() => {
        if (currentChannel) {
            getMessages();
            joinChannel();
        }
    }, [id]);

    useEffect(() => {
        if (currentChannel) {
            getMessages();
        }
    }, [channels])

    useEffect(() => {
        if (chosenEmoji) {
            const newMessage = `${message} ${chosenEmoji!.emoji}`;
            // setMessage(newMessage);
            setChosenEmoji(null);
        }
    }, [chosenEmoji]);

    const resetMessage = () => {
        const editorState = EditorState.push(message, ContentState.createFromText(''), 'remove-range');
        setMessage(editorState);
    }

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const messageRaw = JSON.stringify(convertToRaw(message.getCurrentContent()));
        if (!messageImage.file) {
            if (messageRaw.length > 0) {
                addMessage(messageRaw, id);
                resetMessage()
            }
        }
        else {
            const imageUrl = await uploadImage(messageImage.file);
            addMessage(messageRaw, id, imageUrl);
            onCloseImageMessageForm();
            resetMessage()
        }
        setLoading(false);
    }

    const onChange = (event: any, file = false) => {
        if (file) {
            const file = event.target.files[0];
            const newPhoto = {
                file,
                url: URL.createObjectURL(file)
            }
            setMessageImage(newPhoto);
        }
    }

    const getMessages = () => {
        const messages = currentChannel?.messages || [];
        const orderedByDate: any = {};

        messages?.forEach((message: iMessage) => {
            const { createdAt } = message;
            const dateStr = new Date(createdAt).toLocaleString().split(',')[0];
            if (orderedByDate.hasOwnProperty(dateStr)) {
                orderedByDate[dateStr].push(message);
            } else {
                orderedByDate[dateStr] = [message];
            }
        })

        setMessages(orderedByDate);
    }

    const joinChannel = () => {
        const isUserRoomMember = currentChannel?.members.find((member: iUser) => member.username === currentUser?.username);

        if (!isUserRoomMember) {
            joinRoom(id);
        } else {
            joinRoom(id, false);
        }
    }

    const onCloseImageMessageForm = () => {
        setMessageImage({
            file: null,
            url: ''
        })
    }

    return {
        message,
        messages,
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
    }
}

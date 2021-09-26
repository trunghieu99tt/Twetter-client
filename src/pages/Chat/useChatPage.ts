import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { iMessage, iNewMessage } from "../../types/message.types";
import client from "../../api/client";
import { useUser } from "@talons/useUser";
import { useUpload } from "@talons/useUpload";
import { useRecoilState, useSetRecoilState } from "recoil";
import { newMessageState } from "states/message.state";
import { useMessage } from "@talons/useMessage";
import { connectedRoomsState } from "states/room.state";
import { iRoom } from "@type/room.types";
import { iUser } from "@type/user.types";
import { useAppContext } from "@context/app.context";
import { callState } from "states/call.state";

const useChatPage = () => {
    const {
        state: {
            peer,
            socket,
        },
        dispatch
    } = useAppContext();
    const [call, setCall] = useRecoilState(callState);
    const params: any = useParams();
    const { roomId } = params;
    const { uploadImage } = useUpload();
    const { user: currentUser } = useUser();
    const { getMessagesQuery } = useMessage(roomId);
    const setNewMessage = useSetRecoilState(newMessageState);
    const [connectedRooms, setConnectedRooms] = useRecoilState(connectedRoomsState);

    const { data, fetchNextPage } = getMessagesQuery;

    const [message, setMessage] = useState<string>('');
    const [room, setRoom] = useState<iRoom | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<iMessage[]>([]);
    const [chosenEmoji, setChosenEmoji] = useState<any>(null);
    const [totalMessage, setTotalMessage] = useState<number>(0);
    const [chatImages, setChatImages] = useState<string[]>([]);
    const [messageImage, setMessageImage] = useState<{
        file: File | null,
        url: string,
    }>({
        file: null,
        url: ""
    })

    const getRoomInfo = async (roomId: string) => {
        try {
            const response = await client.get(`/room/${roomId}`);
            const room = response.data.data;
            setRoom(room);
            setConnectedRooms([...(connectedRooms || []), room]);
        } catch (error) {
            console.log('error getRoomInfo: ', error);
        }
    }

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const newMessage: iNewMessage = {
            author: currentUser,
            content: message,
            roomId: roomId,
        }
        if (messageImage.file) {
            const imageUrl = await uploadImage(messageImage.file);
            newMessage.file = imageUrl;
            onCloseImageMessageForm();
        }
        if (newMessage.content.length > 0 || newMessage.file) {
            setNewMessage(newMessage);
            setMessage('');
            setLoading(false);
        }
    }

    const onChange = (event: any, file = false) => {
        if (!file) {
            setMessage(event.target.value);
        } else {
            const file = event.target.files[0];
            const newPhoto = {
                file,
                url: URL.createObjectURL(file)
            }
            setMessageImage(newPhoto);
        }
    }

    const getMessages = (data: any) => {
        const pages = data?.pages;
        const images: string[] = [];
        const totalRecords = pages?.[0].total || 0;

        const messagesUtils = pages?.reduce(
            (acc: iMessage[], page: any) => {
                const pageMessages = page?.data;
                if (pageMessages) {
                    pageMessages.forEach((message: iMessage) => {
                        if (message.file && message.file.includes('.jpg')) {
                            images.push(message.file);
                        }
                    })
                    return [...acc, ...pageMessages];
                }
                return acc;
            },
            []
        ).reverse();
        setChatImages(images);
        setMessages(messagesUtils);
        setTotalMessage(totalRecords);
    }

    const onCloseImageMessageForm = () => {
        setMessageImage({
            file: null,
            url: ''
        })
    }

    // initialize call message
    const initNewCall = (video: boolean = false) => {
        const { _id, avatar, name } = currentUser;
        const guestUser: iUser | undefined = room?.members.find((member: iUser) => member._id !== _id);

        if (guestUser) {
            const newCall = {
                senderId: _id,
                guestId: guestUser?._id,
                avatar,
                name,
                video,
                peerId: ''
            }
            return newCall;
        }

        return null;
    }

    // update call context
    const caller = (video: boolean = false) => {
        const newCall = initNewCall(video);
        if (newCall) {
            setCall(newCall);
        }
    }

    // fire call event to socket
    const callUserSocket = (video: boolean = false) => {
        const newCall = initNewCall(video);

        if (newCall) {
            if (peer) {
                newCall.peerId = peer.id;
            }
            socket?.emit('startCall', newCall);
        }
    }

    // open audio call
    const openAudioCall = () => {
        caller();
        callUserSocket();
    }

    // open video call
    const openVideoCall = () => {
        caller(true);
        callUserSocket(true);
    }

    useEffect(() => {
        const currentRoom = connectedRooms && connectedRooms.find((room: iRoom) => room._id === roomId);

        if (!currentRoom) {
            getRoomInfo(roomId);
        }

    }, [roomId]);

    useEffect(() => {
        getMessages(data);
    }, [data])

    useEffect(() => {
        if (chosenEmoji) {
            const newMessage = `${message} ${chosenEmoji!.emoji}`;
            setMessage(newMessage);
            setChosenEmoji(null);
        }
    }, [chosenEmoji]);

    const guestUser = room?.members?.find((member: iUser) => member._id !== currentUser?._id);

    return {
        call,
        room,
        message,
        loading,
        messages,
        guestUser,
        chatImages,
        currentUser,
        chosenEmoji,
        messageImage,
        totalMessage,

        onChange,
        onSubmit,
        openAudioCall,
        openVideoCall,
        fetchNextPage,
        setChosenEmoji,
        onCloseImageMessageForm,
    }
}

export { useChatPage };
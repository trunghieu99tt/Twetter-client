/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { iMessage, iNewMessage } from "../../types/message.types";
import { useUser } from "@talons/useUser";
import { useUpload } from "@talons/useUpload";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { newMessageState } from "states/message.state";
import { useMessage } from "@talons/useMessage";
import { connectedRoomsState } from "states/room.state";
import { iRoom } from "@type/room.types";
import { iUser } from "@type/user.types";
import { useAppContext } from "@context/app.context";
import { callState } from "states/call.state";
import { v4 as uuid, v4 } from "uuid";
import client from "api/client";

const useChatPage = () => {
    const {
        state: { peer, socket },
        dispatch,
    } = useAppContext();
    const history = useHistory();
    const [call, setCall] = useRecoilState(callState);
    const params: any = useParams();
    const { roomId } = params;
    const { uploadImage } = useUpload();
    const { user: currentUser } = useUser();
    const { getMessagesQuery } = useMessage(roomId);
    const setNewMessage = useSetRecoilState(newMessageState);
    const connectedRooms = useRecoilValue(connectedRoomsState);

    const { data, fetchNextPage } = getMessagesQuery;

    const [message, setMessage] = useState<string>("");
    const [room, setRoom] = useState<iRoom | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<iMessage[]>([]);
    const [chosenEmoji, setChosenEmoji] = useState<any>(null);
    const [chatImages, setChatImages] = useState<string[]>([]);
    const [guestUser, setGuest] = useState<iUser | null>(null);
    const [totalMessage, setTotalMessage] = useState<number>(0);
    const [showMemberList, setShowMemberList] = useState<boolean>(false);

    const [messageImage, setMessageImage] = useState<{
        file: File | null;
        url: string;
    }>({
        file: null,
        url: "",
    });

    const onSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        const newMessage: iNewMessage = {
            author: currentUser,
            content: message,
            roomId: roomId,
        };
        if (messageImage.file) {
            const imageUrl = await uploadImage(messageImage.file);
            newMessage.file = imageUrl;
            onCloseImageMessageForm();
        }
        if (newMessage.content.length > 0 || newMessage.file) {
            setNewMessage(newMessage);
            setMessage("");
        }
        setLoading(false);
    };

    const onChange = (event: any, file = false) => {
        if (!file) {
            setMessage(event.target.value);
        } else {
            const file = event.target.files[0];
            const newPhoto = {
                file,
                url: URL.createObjectURL(file),
            };
            setMessageImage(newPhoto);
        }
    };

    const getMessages = (data: any) => {
        const pages = data?.pages;
        const images: string[] = [];
        const totalRecords = pages?.[0].total || 0;

        const messagesUtils = pages
            ?.reduce((acc: iMessage[], page: any) => {
                const pageMessages = page?.data;
                if (pageMessages) {
                    pageMessages.forEach((message: iMessage) => {
                        if (message.file && message.file.includes(".jpg")) {
                            images.push(message.file);
                        }
                    });
                    return [...acc, ...pageMessages];
                }
                return acc;
            }, [])
            .reverse();
        setChatImages(images);
        setMessages(messagesUtils);
        setTotalMessage(totalRecords);
    };

    const onCloseImageMessageForm = () => {
        setMessageImage({
            file: null,
            url: "",
        });
    };

    const triggerCall = async (isVideoCall: boolean = false) => {
        const response = await client.post("/rooms/create-video-call-room");
        const data = response?.data?.data;
        console.log(`newVideoCallRoom`, data);
        const newCall = {
            room,
            isVideoCall,
            senderId: currentUser._id,
            channelName: data?.channelName,
            token: data?.token,
        };
        setCall(newCall);
        socket?.emit("startCall", newCall);
    };

    const openCreateNewGroupChatModal = () => {
        dispatch({
            type: "SET_VISIBLE_ADD_GROUP_CHAT_MODAL",
            payload: true,
        });
    };

    const checkUserIsMember = (room: iRoom) => {
        return room.members.some(
            (member: iUser) => member._id === currentUser._id
        );
    };

    useEffect(() => {
        const currentRoom =
            connectedRooms &&
            connectedRooms.find((room: iRoom) => room._id === roomId);

        if (currentRoom) {
            const isUserMemberOfCurrentRoom = checkUserIsMember(currentRoom);

            if (!isUserMemberOfCurrentRoom) {
                history.push("/");
            } else {
                const otherUser = currentRoom?.members?.find(
                    (member: iUser) => member._id !== currentUser?._id
                );
                if (otherUser) {
                    setGuest(otherUser);
                }
                setRoom(currentRoom);
            }
        } else if (connectedRooms) {
            history.push("/");
        }
    }, [roomId, connectedRooms]);

    useEffect(() => {
        getMessages(data);
    }, [data]);

    useEffect(() => {
        if (chosenEmoji) {
            const newMessage = `${message} ${chosenEmoji!.emoji}`;
            setMessage(newMessage);
            setChosenEmoji(null);
        }
    }, [chosenEmoji]);

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
        showMemberList,

        onChange,
        onSubmit,
        triggerCall,
        fetchNextPage,
        setChosenEmoji,
        setShowMemberList,
        onCloseImageMessageForm,
        openCreateNewGroupChatModal,
    };
};

export { useChatPage };

/* eslint-disable no-mixed-operators */
import { useAppContext } from "@context/app.context";
import { useUser } from "@talons/useUser";
import { MESSAGES_QUERIES } from "constants/message.constants";
import { useEffect, useRef } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { callState } from "states/call.state";
import { newMessageState } from "states/message.state";
import { connectedRoomsState, joinDMRoomState } from "states/room.state";
import { socketState } from "states/socket.state";
import { connectedUsersState, prevUserState } from "states/user.state";
import { Socket } from "./socket";

const useSocket = () => {
    const { dispatch } = useAppContext();
    const queryClient = useQueryClient();
    const socketInstance = useRef(null);
    const previousUser = useRecoilValue(prevUserState);
    const setCall = useSetRecoilState(callState);
    const [joinDMRoom, setJoinDMRoom] = useRecoilState(joinDMRoomState);
    const [connectedRooms, setConnectedRooms] = useRecoilState(connectedRoomsState);
    const [newMessage, setNewMessage] = useRecoilState(newMessageState);
    const [connectedUsers, setConnectedUsers] = useRecoilState(connectedUsersState);
    const { user } = useUser();
    const history = useHistory();
    const [socketStore, setSocket] = useRecoilState(socketState);

    useEffect(() => {
        if (!socketInstance.current) {
            const newSocket = new Socket().socket;
            socketInstance.current = newSocket;
            init();
        }
    }, [])

    useEffect(() => {
        if (user?._id !== previousUser?._id || !previousUser) {
            if (user?._id && socketInstance?.current) {
                (socketInstance.current as any).emit("userOn", user);
            } else if (!user?._id && previousUser?._id && socketInstance?.current) {
                (socketInstance.current as any).emit("userOff", previousUser);
            }
        }
    }, [user])

    useEffect(() => {
        if (joinDMRoom && joinDMRoom?.userIds && socketInstance?.current) {
            (socketInstance.current as any).emit("joinDmRoom", joinDMRoom);
        }
    }, [joinDMRoom])

    useEffect(() => {
        if ((newMessage && newMessage?.content?.length > 0 || newMessage && newMessage?.file) && socketInstance?.current) {
            console.log("newMessage", newMessage);
            (socketInstance.current as any).emit("newMessage", newMessage);
        }
    }, [newMessage]);


    const init = () => {
        const socket = (socketInstance.current as any);


        socket.on('connect', () => {
            console.log('Connected')
            // setSocket(socket);
            dispatch({ type: "SET_SOCKET", payload: socket });
        })

        socket.on('users', (res: any) => {
            // console.log(`res users`, res)
            setConnectedUsers(res);
        });

        socket.on('joinDmRoom', (res: any) => {
            console.log('res joinDmRoom: ', res)
            setJoinDMRoom(null);
            setConnectedRooms([...(connectedRooms || []), res]);
            // Go to DM room
            history.push(`/chat/${res._id}`);
        })

        socket.on('newMessage', (res: any) => {
            console.log(`res newMessage`, res);
            setNewMessage(null);
            const queryKey = [MESSAGES_QUERIES.GET_MESSAGES, res.roomId];
            console.log(`queryKey`, queryKey)
            queryClient.invalidateQueries(
                [MESSAGES_QUERIES.GET_MESSAGES, res.roomId],
            )
        });

        socket.on('callerConnected', (res: any) => {
            console.log('caller connected!');
            setCall(res);
        });

    }

    const createChannel = (channel: any) => {
        const username = user?.username;
        if (username) {
            (socketInstance.current as any).emit('createRoom', { channel, username });
        }
    }

    const addMessage = (message: string, roomID: string, file: string | null = null) => {
        const username = user?.username;
        if (username) {
            (socketInstance.current as any).emit("addMessage", {
                username,
                content: message,
                roomID,
                file
            });
        }
    }

    const joinRoom = (roomID: string, isNew = true) => {
        const username = user?.username;
        if (username) {
            const event = isNew ? 'joinNewRoom' : 'joinOldRoom';
            (socketInstance.current as any).emit(event, {
                username,
                roomID,
            });
        }
    }


    const updateChannel = (channel: any) => {
        const username = user?.username;
        if (username) {
            (socketInstance.current as any).emit('updateRoom', { channel, username });
        }
    }


    return {
        joinRoom,
        addMessage,
        createChannel,
        updateChannel
    }

}

export { useSocket };
import { useUser } from "@talons/useUser";
import { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { connectedUsersState, prevUserState } from "states/user.state";
import { Socket } from "./socket";

const useSocket = () => {
    const socketInstance = useRef(null);
    const previousUser = useRecoilValue(prevUserState);
    const setConnectedUsers = useSetRecoilState(connectedUsersState);
    const { user } = useUser();


    useEffect(() => {
        if (!socketInstance.current) {
            const socket = new Socket().socket;
            socketInstance.current = socket;
            init();
        }
    }, [])

    useEffect(() => {
        if (user?._id && socketInstance?.current) {
            (socketInstance.current as any).emit("userOn", user);
        } else if (!user?._id && previousUser?._id && socketInstance?.current) {
            (socketInstance.current as any).emit("userOff", previousUser);
        }
    }, [user])


    const init = () => {
        const socket = (socketInstance.current as any);
        socket.on('connect', () => {
            // console.log('Connected')
        })

        socket.on('users', (res: any) => {
            setConnectedUsers(res);
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
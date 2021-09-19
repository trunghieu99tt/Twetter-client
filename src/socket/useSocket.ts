import { iUser } from "@type/user.types";
import { isEqual } from "lodash";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { connectedUsersState, userState } from "states/user.state";
import { Socket } from "./socket";

const useSocket = () => {
    const socketInstance = useRef(null);
    const [connectedUsers, setConnectedUsers] = useRecoilState(connectedUsersState);
    const [user, setUser] = useRecoilState(userState)


    useEffect(() => {
        const socket = new Socket().socket;
        socketInstance.current = socket;
        init();
    }, [])



    useEffect(() => {
        if (connectedUsers && connectedUsers.length > 0 && user) {
            const userDB = connectedUsers?.find((connectedUser: iUser) => connectedUser._id === user._id);
            if (userDB && !isEqual(userDB, user)) {
                setUser(userDB);
            }
        }
    }, [connectedUsers, user]);



    const init = () => {
        const socket = (socketInstance.current as any);
        socket.on('connect', () => {
            // console.log('Connected')
        })

        socket.on('users', (res: any) => {
            console.log(`res`, res)
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
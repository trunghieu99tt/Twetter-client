/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-operators */
import { showNotificationToast } from "@components/Notification/notificationUtils";
import { useAppContext } from "@context/app.context";
import { useUser } from "@talons/useUser";
import { MESSAGES_QUERIES } from "constants/message.constants";
import { NOTIFICATION_QUERIES } from "constants/notify.constants";
import { useEffect, useRef } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { callState } from "states/call.state";
import { newMessageState } from "states/message.state";
import { connectedRoomsState, joinDMRoomState } from "states/room.state";
import { connectedUsersState, prevUserState } from "states/user.state";
import { Socket } from "./socket";

const spawnNotification = (body: any, icon: any, url: any, title: any) => {
    let options = {
        body,
        icon,
    };
    let n = new Notification(title, options);

    n.onclick = (e) => {
        e.preventDefault();
        window.open(url, "_blank");
    };
};

const useSocket = () => {
    const { dispatch } = useAppContext();
    const queryClient = useQueryClient();
    const socketInstance = useRef(null);
    const previousUser = useRecoilValue(prevUserState);
    const [call, setCall] = useRecoilState(callState);
    const [joinDMRoom, setJoinDMRoom] = useRecoilState(joinDMRoomState);
    const [newMessage, setNewMessage] = useRecoilState(newMessageState);

    const [connectedRooms, setConnectedRooms] =
        useRecoilState(connectedRoomsState);
    const setConnectedUsers = useSetRecoilState(connectedUsersState);
    const { user } = useUser();
    const history = useHistory();

    useEffect(() => {
        if (!socketInstance.current) {
            const newSocket = new Socket().socket;
            socketInstance.current = newSocket;
            init();
        }
    }, []);

    useEffect(() => {
        if (user?._id && socketInstance.current) {
            (socketInstance.current as any).emit("userOn", user);
        }
        if (!previousUser || user?._id !== previousUser?._id) {
            if (!user?._id && previousUser?._id && socketInstance?.current) {
                (socketInstance.current as any).emit("userOff", previousUser);
            }
        }
    }, [user]);

    useEffect(() => {
        if (joinDMRoom && joinDMRoom?.userIds && socketInstance?.current) {
            (socketInstance.current as any).emit("joinDmRoom", joinDMRoom);
        }
    }, [joinDMRoom]);

    useEffect(() => {
        if (
            ((newMessage && newMessage?.content?.length > 0) ||
                (newMessage && newMessage?.file)) &&
            socketInstance?.current
        ) {
            console.log("newMessage", newMessage);
            (socketInstance.current as any).emit("newMessage", newMessage);
        }
    }, [newMessage]);

    useEffect(() => {
        const socket = socketInstance.current as any;
        console.log(`socket.id`, socket.id);
        socket.on("answerCall", (res: any) => {
            if (call) {
                history.push(`/call/${res.roomId}`);
            }
        });
    }, [call]);

    const init = () => {
        const socket = socketInstance.current as any;

        socket.on("connect", () => {
            console.log("Connected");
            // setSocket(socket);
            dispatch({ type: "SET_SOCKET", payload: socket });
        });

        socket.on("users", (res: any) => {
            // console.log(`res users`, res)
            setConnectedUsers(res);
        });

        socket.on("newMessage", (res: any) => {
            setNewMessage(null);
            queryClient.invalidateQueries([
                MESSAGES_QUERIES.GET_MESSAGES,
                res.roomId,
            ]);
        });

        socket.on("hasCall", (res: any) => {
            setCall(res);
        });

        socket.on("newNotification", (res: any) => {
            console.log(`res`, res);
            showNotificationToast(res);
            spawnNotification(
                res.text,
                res.sender.avatar,
                res?.url || "",
                "Tweeter"
            );
            queryClient.invalidateQueries(
                NOTIFICATION_QUERIES.GET_NOTIFICATIONS
            );
        });
    };
    return {};
};

export { useSocket };

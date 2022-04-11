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
import { callState, roomsHaveCallState } from "states/call.state";
import { newMessageState } from "states/message.state";
import { connectedRoomsState, joinRoomState } from "states/room.state";
import { connectedUsersState, prevUserState } from "states/user.state";
import { Socket } from "./socket";

const spawnNotification = (body: any, icon: any, url: any, title: any) => {
  const options = {
    body,
    icon,
  };
  const n = new Notification(title, options);

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
  const joinRoom = useRecoilValue(joinRoomState);
  const setConnectedRooms = useSetRecoilState(connectedRoomsState);
  const [newMessage, setNewMessage] = useRecoilState(newMessageState);
  const setConnectedUsers = useSetRecoilState(connectedUsersState);
  const [roomsHaveCall, setRoomsHaveCall] = useRecoilState(roomsHaveCallState);
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
    if (joinRoom && joinRoom?.owner && socketInstance?.current) {
      (socketInstance.current as any).emit("newDMRoom", joinRoom);
    }
  }, [joinRoom]);

  useEffect(() => {
    if (
      ((newMessage && newMessage?.content?.length > 0) ||
        (newMessage && newMessage?.file)) &&
      socketInstance?.current
    ) {
      (socketInstance.current as any).emit("newMessage", newMessage);
    }
  }, [newMessage]);

  useEffect(() => {
    const socket = socketInstance.current as any;
    socket.on("answerCall", (res: any) => {
      console.log("res:", res);
      if (call) {
        history.push(`/call/${res.channelName}`);
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

    socket.on("roomCallStateChanged", (res: any) => {
      const { roomId, hasCall, channelName, token } = res;
      if (hasCall) {
        const isRoomHavingCall = roomsHaveCall.find((r) => r.roomId === roomId);

        if (!isRoomHavingCall) {
          setRoomsHaveCall([
            ...roomsHaveCall,
            {
              roomId,
              channelName,
              token,
            },
          ]);
        }
      } else {
        setRoomsHaveCall((prev) => prev.filter((r) => r.roomId !== roomId));
      }
    });

    socket.on("newNotification", (res: any) => {
      showNotificationToast(res);
      spawnNotification(res.text, res.sender.avatar, res?.url || "", "Tweeter");
      queryClient.invalidateQueries(NOTIFICATION_QUERIES.GET_NOTIFICATIONS);
    });

    socket.on("newDMRoom", (res: any) => {
      const newRoomId = res._id;
      setConnectedRooms((prev) => [...(prev || []), res]);
      history.push(`/chat/${newRoomId}`);
    });

    socket?.on("callStop", (res: any) => {
      console.log("res", res);
      console.log("call", call);
      if (call && call.room._id === res.roomId) {
        setCall(null);
      }
    });
  };
  return {};
};

export { useSocket };

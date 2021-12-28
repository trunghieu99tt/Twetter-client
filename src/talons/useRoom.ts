import { iRoomDTO } from "@type/room.types";
import client from "api/client";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { connectedRoomsState } from "states/room.state";

const useRooms = () => {
    const [connectedRooms, setConnectedRooms] =
        useRecoilState(connectedRoomsState);

    const getUserRooms = async () => {
        const response = await client.get("/rooms/myRoom");
        const rooms = response.data.data;
        setConnectedRooms(rooms);
    };

    const createNewRoom = async (newRoom: iRoomDTO) => {
        try {
            const response = await client.post("/rooms", newRoom);
            const room = response?.data?.data;

            if (room) {
                const newConnectedRooms = [...(connectedRooms || []), room];
                setConnectedRooms(newConnectedRooms);

                return room;
            }
        } catch (error: any) {
            console.log("error create new room: ", error);
            toast.error(error.response?.data?.message);
        }
    };

    return {
        createNewRoom,
        getUserRooms,
    };
};

export { useRooms };

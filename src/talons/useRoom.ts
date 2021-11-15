import { iRoomDTO } from "@type/room.types";
import client from "api/client";
import { useRecoilState } from "recoil";
import { connectedRoomsState } from "states/room.state";

const useRooms = () => {
    const [connectedRooms, setConnectedRooms] =
        useRecoilState(connectedRoomsState);

    const getAllUserRooms = async () => {
        const response = await client.get("/rooms/myRoom");
        const rooms = response.data.data;
        console.log(`rooms`, rooms);
        setConnectedRooms(rooms);
    };

    const createNewRoom = async (newRoom: iRoomDTO) => {
        const response = await client.post("/rooms", newRoom);
        const room = response?.data?.data;

        if (room) {
            const newConnectedRooms = [...connectedRooms, room];
            setConnectedRooms(newConnectedRooms);
        }
    };

    return {
        createNewRoom,
        getAllUserRooms,
    };
};

export { useRooms };

import client from "api/client";
import { useSetRecoilState } from "recoil";
import { connectedRoomsState } from "states/room.state";

const useRooms = () => {
    const setConnectedRooms = useSetRecoilState(connectedRoomsState);

    const getAllUserRooms = async () => {
        const response = await client.get('/rooms/myRoom');
        const rooms = response.data.data;
        console.log(`rooms`, rooms)
        setConnectedRooms(rooms);
    }

    return {
        getAllUserRooms
    }
}

export { useRooms as useRoom };
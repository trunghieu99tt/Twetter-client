import { iRoom } from '@type/room.types';
import { atom } from 'recoil';

export const connectedRoomsState = atom<iRoom[]>({
    key: 'connectedRoomsState',
    default: []
})

export const joinDMRoomState = atom<{ userIds: string[] } | null>({
    key: 'joinDMRoomState',
    default: null,
})
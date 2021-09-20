import { iRoom } from '@type/room.types';
import { atom } from 'recoil';

export const roomsState = atom<iRoom[] | null>({
    key: 'roomsState',
    default: null
})

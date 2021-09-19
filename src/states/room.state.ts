import { iRoom } from '@type/room.types';
import { atom } from 'recoil';

export const roomState = atom<iRoom[] | null>({
    key: 'roomState',
    default: null
})
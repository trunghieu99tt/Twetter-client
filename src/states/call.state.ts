import { atom } from 'recoil';

export const callState = atom<any>({
    key: 'callState',
    default: null
})
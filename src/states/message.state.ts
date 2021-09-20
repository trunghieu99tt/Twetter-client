import { iMessage, iNewMessage } from '@type/message.types';
import { atom, selectorFamily } from 'recoil';

export const newMessageState = atom<iNewMessage | null>({
    key: 'new-message',
    default: null,
})

export const messagesState = atom<{
    [key: string]: iMessage[];
}>({
    key: 'messages',
    default: {},
})

export const roomMessageSelector = selectorFamily({
    key: 'roomMessageSelector',
    get: (roomId: string) => ({ get }) => {
        const messages = get(messagesState);

        return messages?.[roomId] || [];
    }
});
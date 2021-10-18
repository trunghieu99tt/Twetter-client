import { iStory, iStoryGroup } from '@type/story.types';
import { atom, selectorFamily } from 'recoil';

export const storiesState = atom<iStoryGroup | null>({
    key: 'stories',
    default: null,
});

export const storySelector = selectorFamily<iStory[] | null, string>({
    key: 'story',
    get: (userId: string) => ({ get }) => {
        const stories = get(storiesState);
        if (!stories) return null;
        return stories[userId] || null;
    },
});

export const activeUserStoryState = atom<string | null>({
    key: 'activeUserStoryState',
    default: null,
});
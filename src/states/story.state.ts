import { iStory, iStoryGroup } from "@type/story.types";
import { UserModel } from "model/user.model";
import { atom, selector, selectorFamily } from "recoil";

export const storiesState = atom<iStoryGroup | null>({
  key: "stories",
  default: null,
});

export const storySelector = selectorFamily<iStory[] | null, string>({
  key: "story",
  get:
    (userId: string) =>
    ({ get }) => {
      const stories = get(storiesState);
      if (!stories) return null;
      return stories[userId] || null;
    },
});

export const userStoryMetadataSelector = selectorFamily({
  key: "userStoryMetadata",
  get:
    (userId: string) =>
    ({ get }) => {
      const stories = get(storiesState);
      if (!stories) return null;
      // convert stories object to array with form [userId, [stories[]]]
      const convertedStory = Object.entries(stories);
      const idxInList = convertedStory.findIndex(([key]) => key === userId);
      const hasNext = idxInList < convertedStory.length - 1;
      const hasPrev = idxInList > 0;
      const nextUserId = hasNext ? convertedStory[idxInList + 1][0] : null;
      const prevUserId = hasPrev ? convertedStory[idxInList - 1][0] : null;

      return {
        idxInList,
        nextUserId,
        prevUserId,
      };
    },
});

export const activeStoryGroupOwnerIdState = atom<string | null>({
  key: "activeStoryGroupOwnerIdState",
  default: null,
});

export const ownersSelector = selector({
  key: "ownersSelectors",
  get: ({ get }) => {
    const storyGroups = get(storiesState);
    return (
      storyGroups &&
      Object.values(storyGroups).map((stories: iStory[]) =>
        new UserModel(stories[0].owner).getData()
      )
    );
  },
});

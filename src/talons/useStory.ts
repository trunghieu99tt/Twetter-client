/* eslint-disable react-hooks/exhaustive-deps */
import { iStory, iStoryCreate, iStoryGroup } from "@type/story.types";
import client from "api/client";
import { STORY_ENDPOINTS, STORY_QUERY } from "constants/story.constants";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { storiesState } from "states/story.state";

const getStoriesFeed = async () => {
    const response = await client.get(
        `${STORY_ENDPOINTS.BASE}?page=0&limit=1000`
    );
    return response.data.data;
};

const createStory = async (newStory: iStoryCreate) => {
    const response = await client.post(STORY_ENDPOINTS.BASE, newStory);
    return response.data;
};

const updateStory = async ({ storyId }: { storyId: string }) => {
    const response = await client.patch(`${STORY_ENDPOINTS.BASE}/${storyId}`);
    return response.data;
};

const deleteStory = async ({ storyId }: { storyId: string }) => {
    const response = await client.delete(`${STORY_ENDPOINTS.BASE}/${storyId}`);
    return response.data;
};

export const useStory = () => {
    const setStories = useSetRecoilState(storiesState);
    const queryClient = useQueryClient();

    const invalidateStoryQuery = () => {
        queryClient.invalidateQueries(STORY_QUERY.GET_STORIES);
    };

    const getStoriesFeedQuery = useQuery(
        STORY_QUERY.GET_STORIES,
        getStoriesFeed,
        {
            staleTime: 1000 * 60 * 60, // 1 hour
        }
    );

    const createStoryMutation = useMutation(createStory, {
        onSuccess: () => {
            invalidateStoryQuery();
        },
    });

    const updateStoryMutation = useMutation(updateStory, {
        onSuccess: (response: any) => {
            // const data = response?.data;
            // // find and replace the story in react-query
            // const stories = getStoriesFeedQuery.data;

            // const updatedStory = stories.map((story: iStory) => {
            //     if (story._id === data._id) {
            //         return data;
            //     }
            //     return story;
            // });
            // queryClient.setQueryData(STORY_QUERY.GET_STORIES, updatedStory);
            invalidateStoryQuery();
        },
    });

    const deleteStoryMutation = useMutation(deleteStory, {
        onSuccess: () => {
            invalidateStoryQuery();
        },
    });

    const refetchAll = () => {};

    const storyList = getStoriesFeedQuery.data;

    useEffect(() => {
        const groupStoryByUser: iStoryGroup = storyList?.reduce(
            (
                res: {
                    [key: string]: iStory[];
                },
                curr: iStory
            ) => {
                const { owner } = curr;
                if (res.hasOwnProperty(owner._id)) {
                    res[owner._id].push(curr);
                } else {
                    res[owner._id] = [curr];
                }
                return res;
            },
            {}
        );
        setStories(groupStoryByUser);
    }, [storyList]);

    return {
        refetchAll,
        getStoriesFeedQuery,
        createStoryMutation,
        updateStoryMutation,
        deleteStoryMutation,
    };
};

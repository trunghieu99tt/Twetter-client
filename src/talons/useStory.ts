import { iStoryCreate } from "@type/story.types";
import { getInfinityList } from "@utils/query";
import client from "api/client";
import { INFINITY_QUERY_LIST_CONFIG } from "constants/config.constant";
import { STORY_ENDPOINTS, STORY_QUERY } from "constants/story.constants";
import { QueryFunctionContext, useInfiniteQuery, useMutation, useQueryClient } from "react-query";

const getStoriesFeed = async ({ pageParam = 0 }: QueryFunctionContext) => {
    return getInfinityList(STORY_ENDPOINTS.BASE, pageParam);
};

const createStory = async (newStory: iStoryCreate) => {
    const response = await client.post(STORY_ENDPOINTS.BASE, newStory);
    return response.data;
};

const updateStory = async ({ storyId }: {
    storyId: string;
}) => {
    const response = await client.put(`${STORY_ENDPOINTS.BASE}/${storyId}`);
    return response.data;
};

const deleteStory = async ({ storyId }: {
    storyId: string;
}) => {
    const response = await client.delete(`${STORY_ENDPOINTS.BASE}/${storyId}`);
    return response.data;
};


export const useStory = () => {

    const queryClient = useQueryClient();

    const invalidateStoryQuery = () => {
        queryClient.invalidateQueries(STORY_QUERY.GET_STORIES);
    };

    const getStoriesFeedQuery = useInfiniteQuery([STORY_QUERY.GET_STORIES], getStoriesFeed, INFINITY_QUERY_LIST_CONFIG);

    const createStoryMutation = useMutation(createStory, {
        onSuccess: () => {
            invalidateStoryQuery();
        }
    });

    const updateStoryMutation = useMutation(updateStory, {
        onSuccess: () => {
            invalidateStoryQuery();
        }
    });

    const deleteStoryMutation = useMutation(deleteStory, {
        onSuccess: () => {
            invalidateStoryQuery();
        }
    });

    return {
        getStoriesFeedQuery,
        createStoryMutation,
        updateStoryMutation,
        deleteStoryMutation
    };
};
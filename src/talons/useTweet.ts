import { QueryFunctionContext, useInfiniteQuery, useMutation, useQueryClient } from "react-query";

// api
import client from "api/client";

// types
import { iCreateTweetDTO } from "@type/tweet.types";

// constants
import { TWEET_ENDPOINTS, TWEET_QUERY } from "constants/tweet.constants";

const LIMIT = 2;

const getUserTweets = async ({ queryKey, pageParam = 0 }: QueryFunctionContext) => {
    const userId = queryKey[1];
    if (userId) {
        const response = await client.get(`${TWEET_ENDPOINTS.GET_USER_TWEETS}/${userId}`, {
            params: {
                limit: LIMIT,
                page: pageParam + 1,
            },
        });
        return {
            data: response?.data?.data || [],
            total: response?.data?.total || 0
        }
    }

    return {
        data: [],
        total: 0
    }
}

const getNewsFeedTweets = async ({ pageParam = 0, limit = LIMIT }) => {
    const response = await client.get(TWEET_ENDPOINTS.BASE, {
        params: {
            page: pageParam + 1,
            limit,
        },
    });
    return {
        data: response?.data?.data || [],
        total: response?.data?.total || 0
    }
}

const createTweet = async (newTweet: iCreateTweetDTO) => {
    const response = await client.post(TWEET_ENDPOINTS.BASE, newTweet);
    return response?.data;
}

const deleteTweet = async (id: string) => {
    const response = await client.delete(`${TWEET_ENDPOINTS.BASE}/${id}`);
    return response?.data;
}

const infinityListConfig = {
    staleTime: 60 * 60 * 1000, // 1 hour
    getPreviousPageParam: (lastPage: any, pages: any) => {
        return pages.length - 1;
    },
    getNextPageParam: (lastPage: any, pages: any) => {
        const totalPage = lastPage.total / LIMIT;
        return pages.length < totalPage ? pages.length : null;
    }
}


export const useTweet = (userId = "") => {

    const queryClient = useQueryClient();

    const getProfileTweetsQuery = useInfiniteQuery([TWEET_QUERY.GET_MY_TWEETS, userId], getUserTweets, {
        ...infinityListConfig
    });

    const getNewsFeedTweetsQuery = useInfiniteQuery(TWEET_QUERY.GET_NEWS_FEED_TWEETS, getNewsFeedTweets, {
        ...infinityListConfig
    });

    const createTweetMutation = useMutation(createTweet, {
        onSuccess: () => {
            queryClient.invalidateQueries(TWEET_QUERY.GET_MY_TWEETS);
            queryClient.invalidateQueries(TWEET_QUERY.GET_NEWS_FEED_TWEETS);
        }
    });
    const deleteTweetMutation = useMutation(deleteTweet, {
        onSuccess: () => {
            queryClient.invalidateQueries(TWEET_QUERY.GET_MY_TWEETS);
            queryClient.invalidateQueries(TWEET_QUERY.GET_NEWS_FEED_TWEETS);
        }
    });

    return {
        getProfileTweetsQuery,
        getNewsFeedTweetsQuery,

        createTweetMutation,
        deleteTweetMutation
    }
};
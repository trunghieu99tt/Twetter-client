import { QueryFunctionContext, useInfiniteQuery, useMutation, useQueryClient } from "react-query";

// api
import client from "api/client";

// types
import { iCreateTweetDTO } from "@type/tweet.types";

// constants
import { TWEET_ENDPOINTS, TWEET_QUERY } from "constants/tweet.constants";

const LIMIT = 2;

const getList = async (endpoint: string, pageParam = 0, limit = LIMIT) => {
    const response = await client.get(endpoint, {
        params: {
            page: pageParam + 1,
            limit
        },
    });

    return {
        data: response?.data?.data || [],
        total: response?.data?.total || 0
    }
}

const getUserTweets = async ({ queryKey, pageParam = 0 }: QueryFunctionContext) => {
    const userId = queryKey[1];
    if (userId) {
        return getList(`${TWEET_ENDPOINTS.GET_USER_TWEETS}/${userId}`, pageParam);
    }

    return {
        data: [],
        total: 0
    }
}

const getNewsFeedTweets = async ({ pageParam = 0, limit = LIMIT }) => {
    return getList(TWEET_ENDPOINTS.BASE, pageParam, limit);
}

const getPopularTweets = async ({ pageParam = 0, limit = LIMIT }) => {
    return getList(TWEET_ENDPOINTS.POPULAR_TWEETS, pageParam, limit);
}

const getLatestTweets = async ({ pageParam = 0, limit = LIMIT }) => {
    return getList(TWEET_ENDPOINTS.LATEST_TWEETS, pageParam, limit);
}


const getTweetsMedia = async ({ pageParam = 0, limit = 10 }) => {
    return getList(TWEET_ENDPOINTS.BASE, pageParam, limit);
}

const getMySavedTweets = async ({ pageParam = 0, limit = LIMIT }) => {
    return getList(TWEET_ENDPOINTS.MY_SAVED_TWEETS, pageParam, limit);
}

const createTweet = async (newTweet: iCreateTweetDTO) => {
    const response = await client.post(TWEET_ENDPOINTS.BASE, newTweet);
    return response?.data;
}

const deleteTweet = async (id: string) => {
    const response = await client.delete(`${TWEET_ENDPOINTS.BASE}/${id}`);
    return response?.data;
}

const reactTweet = async ({ tweetId }: {
    tweetId: string
}) => {
    const response = await client.post(`${TWEET_ENDPOINTS.REACT_TWEET}/${tweetId}`);
    return response?.data;
}

const retweet = async (tweetId: string) => {
    const response = await client.post(`${TWEET_ENDPOINTS.RETWEET}/${tweetId}`);
    return response?.data;
}

const saveTweet = async (tweetId: string) => {
    const response = await client.post(`${TWEET_ENDPOINTS.SAVE_TWEET}/${tweetId}`);
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


export const useTweets = (userId = "") => {

    const queryClient = useQueryClient();

    const invalidateTweetQueries = () => {
        queryClient.invalidateQueries(TWEET_QUERY.GET_MY_TWEETS);
        queryClient.invalidateQueries(TWEET_QUERY.GET_NEWS_FEED_TWEETS);
    }

    const getProfileTweetsQuery = useInfiniteQuery([TWEET_QUERY.GET_MY_TWEETS, userId], getUserTweets, {
        ...infinityListConfig
    });

    const getNewsFeedTweetsQuery = useInfiniteQuery(TWEET_QUERY.GET_NEWS_FEED_TWEETS, getNewsFeedTweets, {
        ...infinityListConfig
    });

    const getTweetsMediaQuery = useInfiniteQuery(TWEET_QUERY.GET_TWEET_MEDIAS, getTweetsMedia, infinityListConfig);

    const getLatestTweetsQuery = useInfiniteQuery(TWEET_QUERY.LATEST_TWEETS, getLatestTweets, infinityListConfig)

    const getPopularTweetsQuery = useInfiniteQuery(TWEET_QUERY.POPULAR_TWEETS, getPopularTweets, infinityListConfig)

    const getMySavedTweetsQuery = useInfiniteQuery(TWEET_QUERY.GET_MY_SAVED_TWEETS, getMySavedTweets, infinityListConfig)


    const createTweetMutation = useMutation(createTweet, {
        onSuccess: () => {
            invalidateTweetQueries();
        }
    });

    const deleteTweetMutation = useMutation(deleteTweet, {
        onSuccess: () => {
            invalidateTweetQueries();
        }
    });

    const reactTweetMutation = useMutation(reactTweet, {
        onSuccess: () => {
            invalidateTweetQueries();
        }
    });

    const retweetMutation = useMutation(retweet, {
        onSuccess: () => {
            invalidateTweetQueries();
        }
    });

    const saveTweetMutation = useMutation(saveTweet, {
        onSuccess: () => {
            invalidateTweetQueries();
        }
    })


    return {
        getTweetsMediaQuery,
        getLatestTweetsQuery,
        getMySavedTweetsQuery,
        getPopularTweetsQuery,
        getProfileTweetsQuery,
        getNewsFeedTweetsQuery,

        retweetMutation,
        saveTweetMutation,
        reactTweetMutation,
        createTweetMutation,
        deleteTweetMutation,
    }
};
import { QueryFunctionContext, useInfiniteQuery, useMutation, useQueryClient } from "react-query";

// utils
import { getInfinityList } from "@utils/query";

// api
import client from "api/client";

// types
import { iCreateTweetDTO } from "@type/tweet.types";

// constants
import { TWEET_ENDPOINTS, TWEET_QUERY } from "constants/tweet.constants";
import { DEFAULT_LIST_RESPONSE, INFINITY_QUERY_LIST_CONFIG } from "constants/config.constant";


const getUserTweets = async ({ queryKey, pageParam = 0 }: QueryFunctionContext) => {
    const userId = queryKey[1];
    if (userId) {
        return getInfinityList(`${TWEET_ENDPOINTS.GET_USER_TWEETS}/${userId}`, pageParam);
    }
    return DEFAULT_LIST_RESPONSE;
};

const getNewsFeedTweets = async ({ pageParam = 0 }: QueryFunctionContext) => {
    return getInfinityList(TWEET_ENDPOINTS.BASE, pageParam);
};

const getPopularTweets = async ({ pageParam = 0 }: QueryFunctionContext) => {
    return getInfinityList(TWEET_ENDPOINTS.POPULAR_TWEETS, pageParam);
};

const getLatestTweets = async ({ pageParam = 0 }: QueryFunctionContext) => {
    return getInfinityList(TWEET_ENDPOINTS.LATEST_TWEETS, pageParam);
};


const getMySavedTweets = async ({ pageParam = 0 }: QueryFunctionContext) => {
    return getInfinityList(TWEET_ENDPOINTS.MY_SAVED_TWEETS, pageParam);
};

const getLikedTweets = async ({ pageParam = 0, queryKey }: QueryFunctionContext) => {
    const userId = queryKey[1];
    if (userId) {
        return getInfinityList(`${TWEET_ENDPOINTS.MY_LIKED_TWEETS}/${userId}`, pageParam);
    }

    return DEFAULT_LIST_RESPONSE;
};

const getMedias = async ({ pageParam = 0 }: QueryFunctionContext) => {
    return getInfinityList(TWEET_ENDPOINTS.GET_MEDIAS, pageParam);
};

const createTweet = async (newTweet: iCreateTweetDTO) => {
    console.log(`newTweet`, newTweet);
    const response = await client.post(TWEET_ENDPOINTS.BASE, newTweet);
    return response?.data;
};

const updateTweet = async ({ tweetId, updatedTweet }: {
    tweetId: string, updatedTweet: Partial<iCreateTweetDTO>;
}) => {
    if (!tweetId) return;
    const response = await client.patch(`${TWEET_ENDPOINTS.BASE}/${tweetId}`, updatedTweet);
    return response?.data;
};

const deleteTweet = async (id: string) => {
    const response = await client.delete(`${TWEET_ENDPOINTS.BASE}/${id}`);
    return response?.data;
};

const reactTweet = async (tweetId: string) => {
    const response = await client.post(`${TWEET_ENDPOINTS.REACT_TWEET}/${tweetId}`);
    return response?.data;
};

const retweet = async (tweetId: string) => {
    const response = await client.post(`${TWEET_ENDPOINTS.RETWEET}/${tweetId}`);
    return response?.data;
};

const saveTweet = async (tweetId: string) => {
    const response = await client.post(`${TWEET_ENDPOINTS.SAVE_TWEET}/${tweetId}`);
    return response?.data;
};


export const useTweets = (userId = "") => {

    const queryClient = useQueryClient();

    const invalidateTweetQueries = () => {
        queryClient.invalidateQueries(TWEET_QUERY.GET_MY_TWEETS);
        queryClient.invalidateQueries(TWEET_QUERY.GET_NEWS_FEED_TWEETS);
        queryClient.invalidateQueries(TWEET_QUERY.LATEST_TWEETS);
    };

    const getProfileTweetsQuery = useInfiniteQuery([TWEET_QUERY.GET_MY_TWEETS, userId], getUserTweets, INFINITY_QUERY_LIST_CONFIG);

    const getProfileLikedTweetsQuery = useInfiniteQuery([TWEET_QUERY.GET_USER_LIKED_TWEETS, userId], getLikedTweets, INFINITY_QUERY_LIST_CONFIG);

    const getNewsFeedTweetsQuery = useInfiniteQuery(TWEET_QUERY.GET_NEWS_FEED_TWEETS, getNewsFeedTweets, INFINITY_QUERY_LIST_CONFIG);


    const getLatestTweetsQuery = useInfiniteQuery(TWEET_QUERY.LATEST_TWEETS, getLatestTweets, INFINITY_QUERY_LIST_CONFIG);

    const getPopularTweetsQuery = useInfiniteQuery(TWEET_QUERY.POPULAR_TWEETS, getPopularTweets, INFINITY_QUERY_LIST_CONFIG);

    const getMySavedTweetsQuery = useInfiniteQuery(TWEET_QUERY.GET_MY_SAVED_TWEETS, getMySavedTweets, INFINITY_QUERY_LIST_CONFIG);

    const getMediasQuery = useInfiniteQuery(TWEET_QUERY.GET_MEDIAS, getMedias, INFINITY_QUERY_LIST_CONFIG);


    const createTweetMutation = useMutation(createTweet, {
        onSuccess: () => {
            invalidateTweetQueries();
        }
    });

    const updateTweetMutation = useMutation(updateTweet, {
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
    });


    return {
        getMediasQuery,
        getLatestTweetsQuery,
        getMySavedTweetsQuery,
        getPopularTweetsQuery,
        getProfileTweetsQuery,
        getNewsFeedTweetsQuery,
        getProfileLikedTweetsQuery,

        retweetMutation,
        saveTweetMutation,
        reactTweetMutation,
        createTweetMutation,
        deleteTweetMutation,
        updateTweetMutation,
    };
};
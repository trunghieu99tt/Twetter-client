import { iCreateTweetDTO } from "@type/tweet.types";
import client from "api/client";
import { TWEET_ENDPOINTS, TWEET_QUERY } from "constants/tweet.constants";
import { useState } from "react";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

const getMyTweets = async (page = 1, limit = 2) => {
    const response = await client.get(TWEET_ENDPOINTS.GET_MY_TWEETS, {
        params: {
            page: page + 1,
            limit,
        },
    });
    return response?.data?.data || {};
}

const createTweet = async (newTweet: iCreateTweetDTO) => {
    const response = await client.post(TWEET_ENDPOINTS.BASE, newTweet);

    return response?.data;
}

export const useTweet = () => {

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(20);

    const getMyTweetsQuery = useQuery([TWEET_QUERY.GET_MY_TWEETS, page, limit], () => getMyTweets(
        page,
        limit
    ), {
        staleTime: 10 * 60 * 1000, // 10 minutes
    });

    const getMyTweetsInfinityQuery = useInfiniteQuery(TWEET_QUERY.GET_MY_TWEETS, ({ pageParam = 0 }) => getMyTweets(pageParam), {
        getNextPageParam: (lastPage, pages) => {
            console.log('pages: ', pages);
            console.log('lastPage: ', lastPage);
            return lastPage.nextCursor;
        }
    });

    const createTweetMutation = useMutation(TWEET_QUERY.CREATE_NEW_TWEET, createTweet);

    return {
        getMyTweetsQuery,
        createTweetMutation,
        getMyTweetsInfinityQuery
    }
};
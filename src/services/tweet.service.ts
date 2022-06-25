import { IGetList } from "@type/api.type";
import { iCreateTweetDTO, iTweet } from "@type/tweet.types";
import { getInfinityList } from "@utils/query";
import client from "api/client";
import {
  DEFAULT_LIST_RESPONSE,
  USER_MEDIA_LIST_LIMIT,
} from "constants/config.constant";
import { TWEET_ENDPOINTS } from "constants/tweet.constants";
import { QueryFunctionContext } from "react-query";

export class TweetService {
  static getUserTweets = async ({
    queryKey,
    pageParam = 0,
  }: QueryFunctionContext): Promise<IGetList<iTweet>> => {
    const userId = queryKey[1];
    if (userId) {
      return getInfinityList(
        `${TWEET_ENDPOINTS.GET_USER_TWEETS}/${userId}`,
        pageParam
      );
    }
    return DEFAULT_LIST_RESPONSE;
  };

  static getNewsFeedTweets = async ({
    pageParam = 0,
  }: QueryFunctionContext): Promise<IGetList<iTweet>> => {
    return getInfinityList(TWEET_ENDPOINTS.BASE, pageParam);
  };

  static getPopularTweets = async ({
    pageParam = 0,
  }: QueryFunctionContext): Promise<IGetList<iTweet>> => {
    return getInfinityList(TWEET_ENDPOINTS.POPULAR_TWEETS, pageParam);
  };

  static getLatestTweets = async ({
    pageParam = 0,
  }: QueryFunctionContext): Promise<IGetList<iTweet>> => {
    return getInfinityList(TWEET_ENDPOINTS.LATEST_TWEETS, pageParam);
  };

  static getTweetsByTags = async ({
    pageParam = 0,
    queryKey,
  }: QueryFunctionContext): Promise<IGetList<iTweet>> => {
    const tags = queryKey[1];
    if (tags) {
      return getInfinityList(
        `${TWEET_ENDPOINTS.TWEETS_BY_HASHTAG}/${tags}`,
        pageParam
      );
    }

    return DEFAULT_LIST_RESPONSE;
  };

  static getMySavedTweets = async ({
    pageParam = 0,
  }: QueryFunctionContext): Promise<IGetList<iTweet>> => {
    return getInfinityList(TWEET_ENDPOINTS.MY_SAVED_TWEETS, pageParam);
  };

  static getLikedTweets = async ({
    pageParam = 0,
    queryKey,
  }: QueryFunctionContext): Promise<IGetList<iTweet>> => {
    const userId = queryKey[1];
    if (userId) {
      return getInfinityList(
        `${TWEET_ENDPOINTS.MY_LIKED_TWEETS}/${userId}`,
        pageParam
      );
    }

    return DEFAULT_LIST_RESPONSE;
  };

  static getMedias = async ({
    pageParam = 0,
  }: QueryFunctionContext): Promise<IGetList<iTweet>> => {
    return getInfinityList(TWEET_ENDPOINTS.GET_MEDIAS, pageParam, {
      limit: USER_MEDIA_LIST_LIMIT,
    });
  };

  static getUserMedias = async ({
    pageParam = 0,
    queryKey,
  }: QueryFunctionContext): Promise<IGetList<iTweet>> => {
    const userId = queryKey[1];
    if (userId) {
      return getInfinityList(
        `${TWEET_ENDPOINTS.GET_USER_MEDIAS}/${userId}`,
        pageParam
      );
    }

    return DEFAULT_LIST_RESPONSE;
  };

  static createTweet = async (newTweet: iCreateTweetDTO): Promise<iTweet> => {
    const response = await client.post(TWEET_ENDPOINTS.BASE, newTweet);
    return response?.data;
  };

  static updateTweet = async ({
    tweetId,
    updatedTweet,
  }: {
    tweetId: string;
    updatedTweet: Partial<iCreateTweetDTO>;
  }): Promise<iTweet> => {
    if (!tweetId) {
      throw new Error("Tweet id is required");
    }
    const response = await client.patch(
      `${TWEET_ENDPOINTS.BASE}/${tweetId}`,
      updatedTweet
    );
    return response?.data;
  };

  static deleteTweet = async (id: string): Promise<iTweet> => {
    const response = await client.delete(`${TWEET_ENDPOINTS.BASE}/${id}`);
    return response?.data;
  };

  static reactTweet = async (tweetId: string): Promise<iTweet> => {
    const response = await client.post(
      `${TWEET_ENDPOINTS.REACT_TWEET}/${tweetId}`
    );
    return response?.data;
  };

  static retweet = async (tweetId: string): Promise<iTweet> => {
    const response = await client.post(`${TWEET_ENDPOINTS.RETWEET}/${tweetId}`);
    return response?.data;
  };

  static saveTweet = async (tweetId: string): Promise<iTweet> => {
    const response = await client.post(
      `${TWEET_ENDPOINTS.SAVE_TWEET}/${tweetId}`
    );
    return response?.data;
  };

  static reportTweet = async (tweetId: string): Promise<iTweet> => {
    const response = await client.patch(
      `${TWEET_ENDPOINTS.REPORT_TWEET}/${tweetId}`
    );
    return response?.data;
  };
}

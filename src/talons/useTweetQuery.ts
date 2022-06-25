import { generateInfinityQueryListConfig } from "constants/config.constant";
import { TWEET_QUERY } from "constants/tweet.constants";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { TweetService } from "services/tweet.service";
import { useUser } from "./useUser";

type OPTIMISTIC_UPDATE_INFINITY_LIST = "CREATE" | "UPDATE" | "DELETE";

type TInfinityListData = {
  pages: {
    data: any[];
    total: number;
  }[];
  pageParams: any[];
};

export const useTweetQuery = (userId = "", tag = "") => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const optimisticUpdateInfinityList = async ({
    data,
    query,
    type,
  }: {
    query: string;
    type: OPTIMISTIC_UPDATE_INFINITY_LIST;
    data: any;
  }) => {
    await queryClient.cancelQueries(query);
    const oldData: TInfinityListData | undefined =
      queryClient.getQueryData(query);
    let updatedPages = null;

    switch (type) {
      case "CREATE":
        {
          updatedPages = oldData?.pages?.map((page: any, idx: number) => {
            if (idx === 0) {
              return {
                ...page,
                data: [data, ...page.data],
              };
              return page;
            }
          });
        }
        break;
      case "UPDATE":
        {
          updatedPages = oldData?.pages?.map((page: any) => {
            return {
              ...page,
              data: page.data.map((item: any) => {
                if (item?._id === data?._id) {
                  return {
                    ...item,
                    ...data,
                  };
                }
                return item;
              }),
            };
          });
        }
        break;
      case "DELETE": {
        updatedPages = oldData?.pages?.map((page: any) => {
          return {
            ...page,
            data: page?.data?.filter((item: any) => {
              return item?._id !== data;
            }),
          };
        });
      }
    }

    queryClient.setQueryData(query, {
      ...data,
      pages: updatedPages,
    });

    return oldData;
  };

  const optimisticUpdateInfinityListsRelatedToTweet = async ({
    data,
    type,
  }: {
    data: any;
    type: OPTIMISTIC_UPDATE_INFINITY_LIST;
  }): Promise<void> => {
    await Promise.all(
      [
        TWEET_QUERY.GET_MY_TWEETS,
        TWEET_QUERY.LATEST_TWEETS,
        TWEET_QUERY.GET_MY_SAVED_TWEETS,
        TWEET_QUERY.GET_NEWS_FEED_TWEETS,
        TWEET_QUERY.GET_USER_LIKED_TWEETS,
      ].map(async (query: string) =>
        optimisticUpdateInfinityList({
          data,
          type,
          query,
        })
      )
    );
  };

  const invalidateTweetQueries = () => {
    queryClient.invalidateQueries(TWEET_QUERY.GET_MY_TWEETS);
    queryClient.invalidateQueries(TWEET_QUERY.LATEST_TWEETS);
    queryClient.invalidateQueries(TWEET_QUERY.GET_MY_SAVED_TWEETS);
    queryClient.invalidateQueries(TWEET_QUERY.GET_NEWS_FEED_TWEETS);
    queryClient.invalidateQueries(TWEET_QUERY.GET_USER_LIKED_TWEETS);
  };

  const getProfileTweetsQuery = useInfiniteQuery(
    [TWEET_QUERY.GET_MY_TWEETS, userId],
    TweetService.getUserTweets,
    generateInfinityQueryListConfig()
  );

  const getProfileLikedTweetsQuery = useInfiniteQuery(
    [TWEET_QUERY.GET_USER_LIKED_TWEETS, userId],
    TweetService.getLikedTweets,
    generateInfinityQueryListConfig()
  );

  const getNewsFeedTweetsQuery = useInfiniteQuery(
    TWEET_QUERY.GET_NEWS_FEED_TWEETS,
    TweetService.getNewsFeedTweets,
    generateInfinityQueryListConfig()
  );

  const getLatestTweetsQuery = useInfiniteQuery(
    TWEET_QUERY.LATEST_TWEETS,
    TweetService.getLatestTweets,
    generateInfinityQueryListConfig()
  );

  const getPopularTweetsQuery = useInfiniteQuery(
    TWEET_QUERY.POPULAR_TWEETS,
    TweetService.getPopularTweets,
    generateInfinityQueryListConfig()
  );

  const getMySavedTweetsQuery = useInfiniteQuery(
    TWEET_QUERY.GET_MY_SAVED_TWEETS,
    TweetService.getMySavedTweets,
    generateInfinityQueryListConfig()
  );

  const getMediasQuery = useInfiniteQuery(
    TWEET_QUERY.GET_MEDIAS,
    TweetService.getMedias,
    generateInfinityQueryListConfig()
  );

  const getTweetsByTagQuery = useInfiniteQuery(
    [TWEET_QUERY.GET_TWEETS_BY_HASHTAG, tag],
    TweetService.getTweetsByTags,
    generateInfinityQueryListConfig()
  );

  const getUserMediasQuery = useInfiniteQuery(
    [TWEET_QUERY.GET_USER_MEDIAS, userId],
    TweetService.getUserMedias,
    generateInfinityQueryListConfig()
  );

  const createTweetMutation = useMutation(TweetService.createTweet, {
    onMutate: async (newTweet) => {
      return optimisticUpdateInfinityList({
        type: "CREATE",
        data: {
          ...newTweet,
          author: user,
          isRetweet: false,
          likes: [],
          reportedCount: 0,
          retweeted: [],
          saved: [],
          tags: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          modifiedAt: new Date(),
        },
        query: TWEET_QUERY.GET_NEWS_FEED_TWEETS,
      });
    },
    onSettled: () => {
      invalidateTweetQueries();
    },
  });

  const updateTweetMutation = useMutation(TweetService.updateTweet, {
    onMutate: async (updatedTweet) => {
      return optimisticUpdateInfinityListsRelatedToTweet({
        type: "UPDATE",
        data: updatedTweet,
      });
    },
    onSettled: () => {
      invalidateTweetQueries();
    },
  });

  const deleteTweetMutation = useMutation(TweetService.deleteTweet, {
    onMutate: async (deletedTweet) => {
      return optimisticUpdateInfinityListsRelatedToTweet({
        type: "DELETE",
        data: deletedTweet,
      });
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.message);
    },
    onSettled: () => {
      invalidateTweetQueries();
    },
  });

  const reactTweetMutation = useMutation(TweetService.reactTweet, {
    onMutate: async (updatedTweet) => {
      console.log("updatedTweet", updatedTweet);
      return optimisticUpdateInfinityListsRelatedToTweet({
        type: "UPDATE",
        data: updatedTweet,
      });
    },
    onSettled: () => {
      invalidateTweetQueries();
    },
  });

  const retweetMutation = useMutation(TweetService.retweet, {
    onMutate: async (updatedTweet) => {
      return optimisticUpdateInfinityListsRelatedToTweet({
        type: "UPDATE",
        data: updatedTweet,
      });
    },
    onSettled: () => {
      invalidateTweetQueries();
    },
  });

  const saveTweetMutation = useMutation(TweetService.saveTweet, {
    onMutate: async (updatedTweet) => {
      return optimisticUpdateInfinityListsRelatedToTweet({
        type: "UPDATE",
        data: updatedTweet,
      });
    },
    onSettled: () => {
      invalidateTweetQueries();
    },
  });

  const reportTweetMutation = useMutation(TweetService.reportTweet);

  return {
    getMediasQuery,
    getUserMediasQuery,
    getTweetsByTagQuery,
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
    reportTweetMutation,
  };
};

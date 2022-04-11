import {
  QueryFunctionContext,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useSetRecoilState } from "recoil";

// utils
import { getInfinityList } from "@utils/query";

// api
import client from "api/client";

// states
import { prevUserState } from "states/user.state";

// types
import { iUser } from "../types/user.types";

// constants
import { TWEET_QUERY } from "constants/tweet.constants";
import { USER_ENDPOINTS, USER_QUERY } from "constants/user.constants";
import {
  generateInfinityQueryListConfig,
  LONG_STATE_TIME,
} from "constants/config.constant";

// models
import { UserModel } from "model/user.model";
import { ONE_HOUR } from "constants/app.constants";

export const parseUser = (user: iUser) => {
  if (!user) return undefined;
  if (user?.followers?.length > 0) {
    user.followers = user.followers.map((follower) => new UserModel(follower));
  }
  if (user?.following?.length > 0) {
    user.following = user.following.map(
      (following) => new UserModel(following)
    );
  }
  return new UserModel(user).getData();
};

const getMe = async () => {
  const response = await client.get(USER_ENDPOINTS.GET_ME);
  return parseUser(response?.data?.data);
};

const getUser = async ({ queryKey }: QueryFunctionContext) => {
  const userId = queryKey[1];
  if (!userId) return;
  const response = await client.get(`${USER_ENDPOINTS.BASE}/${userId}`);
  return parseUser(response?.data?.data);
};

const getPopularUsers = async ({ pageParam = 0 }: QueryFunctionContext) => {
  return getInfinityList(USER_ENDPOINTS.POPULAR_USERS, pageParam, {
    limit: 10,
  });
};

// get 5 most popular users
const getLimitedPopularUsers = async () => {
  const response = await client.get(USER_ENDPOINTS.POPULAR_USERS, {
    params: {
      page: 1,
      limit: 5,
    },
  });
  return response?.data?.data || [];
};

const updateUser = async ({
  userId,
  updatedUser,
}: {
  updatedUser: Partial<iUser>;
  userId: string;
}) => {
  if (!userId) return;
  const response = await client.patch(USER_ENDPOINTS.UPDATE_ME, updatedUser);
  return response?.data?.data;
};

const followUser = async (userId: string) => {
  if (!userId) return;
  const response = await client.post(`${USER_ENDPOINTS.FOLLOW}/${userId}`);
  return response?.data;
};

const reportUser = async (userId: string) => {
  const response = await client.patch(
    `${USER_ENDPOINTS.REPORT_USER}/${userId}`
  );
  return response?.data;
};

export const useUser = (userId = "") => {
  const setPreviousUser = useSetRecoilState(prevUserState);

  const queryClient = useQueryClient();

  const invalidateQueriesAfterSuccess = () => {
    queryClient.invalidateQueries(USER_QUERY.GET_ME);
    queryClient.invalidateQueries(USER_QUERY.GET_POPULAR_USERS);
    queryClient.invalidateQueries(USER_QUERY.GET_LIMITED_POPULAR_USERS);
  };

  // Have to separate into 2 query because we need to get the user by token for the
  // first time we load the page. At that time we don't have the userId yet.
  const getMeQuery = useQuery<iUser | undefined>(USER_QUERY.GET_ME, getMe, {
    staleTime: LONG_STATE_TIME,
    retry: 1,
    onError: () => {
      localStorage.removeItem("accessToken");
    },
    onSuccess: (data: iUser | undefined) => {
      if (data) {
        setPreviousUser(data);
      }
    },
  });

  const getUserQuery = useQuery<iUser | undefined>(
    [USER_QUERY.GET_USER, userId],
    getUser,
    {
      staleTime: LONG_STATE_TIME,
      retry: 1,
    }
  );

  const getPopularUsersQuery = useInfiniteQuery(
    USER_QUERY.GET_POPULAR_USERS,
    getPopularUsers,
    generateInfinityQueryListConfig(ONE_HOUR, 10)
  );

  const getLimitedPopularUsersQuery = useQuery<iUser[] | undefined>(
    USER_QUERY.GET_LIMITED_POPULAR_USERS,
    getLimitedPopularUsers,
    {
      staleTime: LONG_STATE_TIME,
      retry: 5,
    }
  );

  const updateUserMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(USER_QUERY.GET_USER);
      queryClient.invalidateQueries(USER_QUERY.GET_ME);
      queryClient.invalidateQueries(TWEET_QUERY.GET_MY_TWEETS);
    },
  });

  const followUserMutation = useMutation(followUser, {
    onSuccess: (user, userId) => {
      invalidateQueriesAfterSuccess();
      if (userId) queryClient.invalidateQueries([USER_QUERY.GET_USER, userId]);
    },
  });

  const reportUserMutation = useMutation(reportUser);

  const user: iUser = new UserModel(getMeQuery.data).getData();

  return {
    user,
    getMeQuery,
    getUserQuery,

    getPopularUsersQuery,
    getLimitedPopularUsersQuery,

    updateUserMutation,
    followUserMutation,
    reportUserMutation,
  };
};

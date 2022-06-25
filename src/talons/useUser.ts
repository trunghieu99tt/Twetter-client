import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useSetRecoilState } from "recoil";
import { prevUserState } from "states/user.state";
import { iUser } from "../types/user.types";
import {
  generateInfinityQueryListConfig,
  LONG_STATE_TIME,
} from "constants/config.constant";
import { TWEET_QUERY } from "constants/tweet.constants";
import { USER_QUERY } from "constants/user.constants";
import { ONE_HOUR } from "constants/app.constants";
import { UserModel } from "model/user.model";
import { UserService } from "services/user.service";

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
  const getMeQuery = useQuery<iUser | undefined>(
    USER_QUERY.GET_ME,
    UserService.getMe,
    {
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
    }
  );

  const getUserQuery = useQuery<iUser | undefined>(
    [USER_QUERY.GET_USER, userId],
    UserService.getUser,
    {
      staleTime: LONG_STATE_TIME,
      retry: 1,
    }
  );

  const getPopularUsersQuery = useInfiniteQuery(
    USER_QUERY.GET_POPULAR_USERS,
    UserService.getPopularUsers,
    generateInfinityQueryListConfig(ONE_HOUR, 10)
  );

  const getLimitedPopularUsersQuery = useQuery<iUser[] | undefined>(
    USER_QUERY.GET_LIMITED_POPULAR_USERS,
    UserService.getLimitedPopularUsers,
    {
      staleTime: LONG_STATE_TIME,
      retry: 5,
    }
  );

  const updateUserMutation = useMutation(UserService.updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(USER_QUERY.GET_USER);
      queryClient.invalidateQueries(USER_QUERY.GET_ME);
      queryClient.invalidateQueries(TWEET_QUERY.GET_MY_TWEETS);
    },
  });

  const followUserMutation = useMutation(UserService.followUser, {
    onSuccess: (user, userId) => {
      invalidateQueriesAfterSuccess();
      if (userId) queryClient.invalidateQueries([USER_QUERY.GET_USER, userId]);
    },
  });

  const reportUserMutation = useMutation(UserService.reportUser);

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

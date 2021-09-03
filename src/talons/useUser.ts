import { QueryFunctionContext, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query";


// utils
import { getInfinityList } from "@utils/query";

// api
import client from "api/client"

// types
import { iUser } from "../types/user.types";

// constants
import { USER_ENDPOINTS, USER_QUERY } from "constants/user.constants";
import { INFINITY_QUERY_LIST_CONFIG, LONG_STATE_TIME } from "constants/config.constant";
import { UserModel } from "model/user.model";

const getMe = async () => {
    const response = await client.get(USER_ENDPOINTS.GET_ME);
    return new UserModel(response?.data?.data);
}

const getUser = async ({ queryKey }: QueryFunctionContext) => {
    const userId = queryKey[1];
    if (!userId)
        return;
    const response = await client.get(`${USER_ENDPOINTS.BASE}/${userId}`);
    return new UserModel(response?.data?.data);
}

const getPopularUsers = async ({ pageParam = 0 }: QueryFunctionContext) => {
    return getInfinityList(USER_ENDPOINTS.POPULAR_USERS, pageParam);
}

// get 5 most popular users
const getLimitedPopularUsers = async () => {
    const response = await client.get(USER_ENDPOINTS.POPULAR_USERS, {
        params: {
            page: 1,
            limit: 5
        },
    });
    return response?.data?.data || [];
}

const updateUser = async ({ userId, updatedUser }: { updatedUser: Partial<iUser>, userId: string }) => {
    if (!userId)
        return;
    const response = await client.patch(USER_ENDPOINTS.UPDATE_ME, updatedUser);
    return response?.data?.data;
}

const followUser = async (userId: string) => {
    if (!userId)
        return;
    const response = await client.post(`${USER_ENDPOINTS.FOLLOW}/${userId}`);
    return response?.data;
}

export const useUser = (
    userId = ""
) => {

    const queryClient = useQueryClient();

    const invalidateQueriesAfterSuccess = () => {
        queryClient.invalidateQueries(USER_QUERY.GET_ME);
        queryClient.invalidateQueries(USER_QUERY.GET_POPULAR_USERS);
        queryClient.invalidateQueries(USER_QUERY.GET_LIMITED_POPULAR_USERS);
    }

    // Have to separate into 2 query because we need to get the user by token for the
    // first time we load the page. At that time we don't have the userId yet.
    const getMeQuery = useQuery<iUser | undefined>(USER_QUERY.GET_ME, getMe, {
        staleTime: LONG_STATE_TIME,
        retry: 5
    });

    const getUserQuery = useQuery<iUser | undefined>([USER_QUERY.GET_USER, userId], getUser, {
        staleTime: LONG_STATE_TIME,
        retry: 5
    });

    const getPopularUsersQuery = useInfiniteQuery(USER_QUERY.GET_POPULAR_USERS, getPopularUsers, INFINITY_QUERY_LIST_CONFIG);

    const getLimitedPopularUsersQuery = useQuery<iUser[] | undefined>(USER_QUERY.GET_LIMITED_POPULAR_USERS, getLimitedPopularUsers, {
        staleTime: LONG_STATE_TIME,
        retry: 5
    });

    const updateUserMutation = useMutation(updateUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(USER_QUERY.GET_ME);
        }
    });

    const followUserMutation = useMutation(followUser, {
        onSuccess: (user, userId) => {
            invalidateQueriesAfterSuccess();
            if (userId)
                queryClient.invalidateQueries([USER_QUERY.GET_USER, userId]);
        }
    });

    const user: iUser = new UserModel(getMeQuery.data);

    return {
        user,
        getMeQuery,
        getUserQuery,

        getPopularUsersQuery,
        getLimitedPopularUsersQuery,

        updateUserMutation,
        followUserMutation
    }
}
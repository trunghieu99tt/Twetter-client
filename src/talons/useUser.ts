import { iUser } from "../types/user.types";
import client from "api/client"
import { QueryFunctionContext, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query";
import { USER_ENDPOINTS, USER_QUERY } from "constants/user.constants";

const LIMIT = 10;

const getMe = async () => {
    const response = await client.get(USER_ENDPOINTS.GET_ME);
    return response?.data?.data;
}

const getUser = async ({ queryKey }: QueryFunctionContext) => {
    const userId = queryKey[1];
    if (!userId)
        return;
    const response = await client.get(`${USER_ENDPOINTS.BASE}/${userId}`);
    return response?.data?.data;
}

const getPopularUsers = async ({ pageParam = 0, limit = LIMIT }) => {
    const response = await client.get(USER_ENDPOINTS.POPULAR_USERS, {
        params: {
            page: pageParam + 1,
            limit
        },
    });

    return {
        data: response?.data?.data || [],
        total: response?.data?.total || 0
    };
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

const DEFAULT_STATE_TIME = 86400 * 1000; // 1 day

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

export const useUser = (
    userId = ""
) => {

    const queryClient = useQueryClient();

    // Have to separate into 2 query because we need to get the user by token for the
    // first time we load the page. At that time we don't have the userId yet.
    const getMeQuery = useQuery<iUser | undefined>(USER_QUERY.GET_ME, getMe, {
        staleTime: DEFAULT_STATE_TIME,
        retry: 5
    });

    const getUserQuery = useQuery<iUser | undefined>([USER_QUERY.GET_USER, userId], getUser, {
        staleTime: DEFAULT_STATE_TIME,
        retry: 5
    });

    const getPopularUsersQuery = useInfiniteQuery(USER_QUERY.GET_POPULAR_USERS, getPopularUsers, infinityListConfig);

    const getLimitedPopularUsersQuery = useQuery<iUser[] | undefined>(USER_QUERY.GET_LIMITED_POPULAR_USERS, getLimitedPopularUsers, {
        staleTime: DEFAULT_STATE_TIME,
        retry: 5
    });

    const updateUserMutation = useMutation(updateUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(USER_QUERY.GET_ME);
        }
    });

    const followUserMutation = useMutation(followUser, {
        onSuccess: (user, userId) => {
            queryClient.invalidateQueries(USER_QUERY.GET_ME);
            queryClient.invalidateQueries(USER_QUERY.GET_POPULAR_USERS);
            queryClient.invalidateQueries(USER_QUERY.GET_LIMITED_POPULAR_USERS);
            if (userId)
                queryClient.invalidateQueries([USER_QUERY.GET_USER, userId]);
        }
    });

    const user: iUser | undefined = queryClient.getQueryData(USER_QUERY.GET_ME);

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
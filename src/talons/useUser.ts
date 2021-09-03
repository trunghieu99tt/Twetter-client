import { iUser } from "../types/user.types";
import client from "api/client"
import { QueryFunctionContext, useMutation, useQuery, useQueryClient } from "react-query";
import { USER_ENDPOINTS, USER_QUERY } from "constants/user.constants";

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

    const updateUserMutation = useMutation(updateUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(USER_QUERY.GET_ME);
        }
    });

    const followUserMutation = useMutation(followUser, {
        onSuccess: (user, userId) => {
            console.log('userId: ', userId);
            queryClient.invalidateQueries(USER_QUERY.GET_ME);
            if (userId)
                queryClient.invalidateQueries([USER_QUERY.GET_USER, userId]);
        }
    });

    const user: iUser | undefined = queryClient.getQueryData(USER_QUERY.GET_ME);

    return {
        user,
        getMeQuery,
        getUserQuery,

        updateUserMutation,
        followUserMutation
    }
}
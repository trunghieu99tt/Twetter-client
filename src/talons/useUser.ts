import { iUser } from "../types/user.types";
import client from "api/client"
import { QueryFunctionContext, useQuery, useQueryClient } from "react-query";
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

export const useUser = (
    userId = ""
) => {

    const queryClient = useQueryClient();

    const getMeQuery = useQuery<iUser | undefined>(USER_QUERY.GET_ME, getMe, {
        staleTime: 86400 * 1000, // 1 day
        retry: 5
    });

    const getUserQuery = useQuery<iUser | undefined>([USER_QUERY.GET_USER, userId], getUser, {
        staleTime: 86400 * 1000, // 1 day
        retry: 5
    });

    const user: iUser | undefined = queryClient.getQueryData(USER_QUERY.GET_ME);

    return {
        user,
        getMeQuery,
        getUserQuery
    }
}
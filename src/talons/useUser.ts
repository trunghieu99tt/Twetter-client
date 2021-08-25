import { iUser } from "../types/user.types";
import client from "api/client"
import { useQuery, useQueryClient } from "react-query";
import { USER_ENDPOINTS, USER_QUERY } from "constants/user.constants";

const getUser = async () => {
    const response = await client.get(USER_ENDPOINTS.GET_USER);
    return response?.data?.data;
}

export const useUser = () => {

    const queryClient = useQueryClient();

    const getUserQuery = useQuery<iUser | undefined>(USER_QUERY.GET_USER, getUser, {
        staleTime: 86400 * 1000, // 1 day
        retry: 5
    });

    const user: iUser | undefined = queryClient.getQueryData(USER_QUERY.GET_USER);

    return {
        user,
        getUserQuery
    }
}
import { getInfinityList } from "@utils/query";
import { DEFAULT_LIST_RESPONSE, INFINITY_QUERY_LIST_CONFIG } from "constants/config.constant";
import { MESSAGES_QUERIES, MESSAGE_ENDPOINTS } from "constants/message.constants";
import { QueryFunctionContext, useInfiniteQuery } from "react-query";

const getMessages = async (
    { pageParam, queryKey }: QueryFunctionContext
) => {

    if (queryKey.length < 3)
        return DEFAULT_LIST_RESPONSE;

    const toUserId = queryKey[2];
    const fromUserId = queryKey[1];

    if (toUserId && fromUserId) {
        return getInfinityList(`${MESSAGE_ENDPOINTS.BASE}/${fromUserId}/${toUserId}`, pageParam)
    }

    return DEFAULT_LIST_RESPONSE;
}

export const useMessage = (formUserId: string, toUserId: string) => {

    const getMessagesQuery = useInfiniteQuery([MESSAGES_QUERIES.GET_MESSAGES, formUserId, toUserId], getMessages, INFINITY_QUERY_LIST_CONFIG);


    return {
        getMessagesQuery
    }
}
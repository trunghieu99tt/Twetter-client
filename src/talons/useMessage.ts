import { getInfinityList } from "@utils/query";
import {
  DEFAULT_LIST_RESPONSE,
  generateInfinityQueryListConfig,
  MESSAGE_LIST_LIMIT,
} from "constants/config.constant";
import {
  MESSAGES_QUERIES,
  MESSAGE_ENDPOINTS,
} from "constants/message.constants";
import { QueryFunctionContext, useInfiniteQuery } from "react-query";

const getMessages = async ({ pageParam, queryKey }: QueryFunctionContext) => {
  if (queryKey.length < 2) return DEFAULT_LIST_RESPONSE;

  const roomId = queryKey[1];

  if (roomId) {
    return getInfinityList(`${MESSAGE_ENDPOINTS.BASE}/${roomId}`, pageParam, {
      limit: MESSAGE_LIST_LIMIT,
    });
  }
};

export const useMessage = (roomId: string) => {
  const getMessagesQuery = useInfiniteQuery(
    [MESSAGES_QUERIES.GET_MESSAGES, roomId],
    getMessages,
    generateInfinityQueryListConfig()
  );

  return {
    getMessagesQuery,
  };
};

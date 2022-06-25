import { IGetList } from "@type/api.type";
import client from "api/client";
import { DEFAULT_LIST_LIMIT } from "constants/config.constant";

export const getInfinityList = async (
  endpoint: string,
  pageParam = 0,
  configParams = {}
): Promise<IGetList<any>> => {
  const response = await client.get(endpoint, {
    params: {
      limit: DEFAULT_LIST_LIMIT,
      page: pageParam + 1,
      ...configParams,
    },
  });
  return {
    data: response?.data?.data || [],
    total: response?.data?.total || 0,
  };
};

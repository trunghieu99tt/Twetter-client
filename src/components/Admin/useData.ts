/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that contains data actions logic
 *
 * @kind function.
 *
 * @return {{
 * fetchOne: func,
 * fetchList: func,
 * addOne: func,
 * updateOne: func,
 * deleteOne: func,
 * }}
 */

import client from "api/client";

interface Props {
  endpoint: string;
  additionalEndpoint?: string;
}

const useData = ({ endpoint, additionalEndpoint }: Props) => {
  const getList = async (params = {}) => {
    const response = await client.get(endpoint, {
      params: {
        ...params,
      },
    });

    return {
      data: response?.data?.data?.data,
      total: response?.data?.data?.total || 0,
    };
  };

  const getOne = async (id: number | string) => {
    const response = await client.get(`${endpoint}/${id}`);
    return response.data;
  };

  const createOne = async (obj: any) => {
    const response = await client.post(
      `${additionalEndpoint || endpoint}`,
      obj
    );
    return response.data;
  };

  const updateOne = async (id: number | string, obj: any) => {
    const response = await client.put(
      `${additionalEndpoint || endpoint}/${id}`,
      obj
    );
    return response.data;
  };

  const deleteOne = async (id: number | string) => {
    const response = await client.delete(`${endpoint}/${id}`);
    return response.data;
  };

  return {
    addOne: createOne,
    fetchOne: getOne,
    fetchList: getList,
    updateOne,
    deleteOne,
  };
};

export { useData };

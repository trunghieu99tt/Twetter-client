import { IGetList } from "@type/api.type";
import { iUser } from "@type/user.types";
import { getInfinityList } from "@utils/query";
import { useState } from "react";

type TSearch = {
  search: string;
  category: string;
};

export const requestSearch = async (
  query: TSearch
): Promise<IGetList<iUser>> => {
  if (!query.search || !query.category) {
    return {
      data: [],
      total: 0,
    };
  }

  return getInfinityList(
    `/search?search=${query.search}&category=${query.category}`,
    0,
    {
      limit: 1000,
    }
  );
};

const useSearch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<TSearch>({
    search: "",
    category: "tweet",
  });
  const [response, setResponse] = useState<{
    type: string;
    data: any[];
  } | null>(null);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setQuery({
      ...query,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    setLoading(true);
    const { data } = await requestSearch(query);
    setLoading(false);
    setResponse({
      type: query.category,
      data,
    });
  };
  return {
    query,
    loading,
    response,

    onSubmit,
    onChange,
  };
};

export { useSearch };

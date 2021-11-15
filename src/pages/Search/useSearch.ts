import { getInfinityList } from "@utils/query";
import { useState } from "react";
import { QueryFunctionContext } from "react-query";

type TSearch = {
    search: string;
    category: string;
};

export const requestSearch = async (query: TSearch) => {
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
        const { data } = await requestSearch(query);
        console.log(`data`, data);
        setResponse({
            type: query.category,
            data,
        });
    };
    return {
        query,
        response,

        onSubmit,
        onChange,
    };
};

export { useSearch };

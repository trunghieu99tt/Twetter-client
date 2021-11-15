import { TMapExistence } from "@type/app.types";
import { iUpdateHashtagDTO } from "@type/hashtag.types";
import client from "api/client";
import { ONE_HOUR } from "constants/app.constants";
import { HASHTAG_ENDPOINTS, HASHTAG_QUERY } from "constants/hashtag.constants";
import { useMutation, useQuery } from "react-query";

const getMostPopularHashtag = async () => {
    const response = await client.get(`${HASHTAG_ENDPOINTS.MOST_POPULAR}`);
    return response.data?.data || [];
};

const updateHashtag = async ({ name, count }: iUpdateHashtagDTO) => {
    const response = await client.patch(`${HASHTAG_ENDPOINTS.BASE}/${name}`, {
        count,
    });
    return response.data;
};

export const useHashtag = () => {
    const getMostPopularHashtagQuery = useQuery(
        HASHTAG_QUERY.GET_MOST_POPULAR,
        getMostPopularHashtag,
        {
            staleTime: ONE_HOUR,
        }
    );

    const updateHashtagMutation = useMutation(
        HASHTAG_QUERY.UPDATE_HASHTAG,
        updateHashtag,
        {
            onSuccess: () => {
                getMostPopularHashtagQuery.refetch();
            },
        }
    );

    const getTagsExistenceMap = (tags: string[] = []): TMapExistence => {
        const tagsExistenceMap: TMapExistence = {};
        tags &&
            tags.forEach((tag) => {
                tagsExistenceMap[tag] = true;
            });
        return tagsExistenceMap;
    };

    const updateHashTags = async (
        oldHashtags: string[],
        newHashtags: string[]
    ) => {
        const oldTagsExistenceMap = getTagsExistenceMap(oldHashtags);
        const newTagsExistenceMap = getTagsExistenceMap(newHashtags);

        const updateHashtagObjects: iUpdateHashtagDTO[] = [];

        newHashtags?.forEach((tag: string) => {
            if (!oldTagsExistenceMap[tag]) {
                updateHashtagObjects.push({ name: tag, count: 1 });
            }
        });

        oldHashtags?.forEach((tag: string) => {
            if (!newTagsExistenceMap[tag]) {
                updateHashtagObjects.push({ name: tag, count: -1 });
            }
        });

        const updateHashtagResponse = await Promise.all(
            updateHashtagObjects.map(async (updateObj: iUpdateHashtagDTO) => {
                return await updateHashtagMutation.mutateAsync(updateObj);
            })
        );

        return updateHashtagResponse;
    };

    return {
        updateHashTags,
        updateHashtagMutation,
        getMostPopularHashtagQuery,
    };
};

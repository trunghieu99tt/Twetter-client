import { QueryFunctionContext, useInfiniteQuery, useMutation, useQueryClient } from "react-query";

// utils
import { getInfinityList } from "@utils/query";

// api
import client from "api/client";

// types
import { iComment, iCreateCommentDTO } from "@type/comments.types";

// constants
import {
    DEFAULT_LIST_RESPONSE,
    INFINITY_QUERY_LIST_CONFIG,
}
    from "constants/config.constant";
import { COMMENT_ENDPOINTS, COMMENT_QUERY } from "constants/comment.constants";


const getMyComments = async ({ queryKey, pageParam = 0 }: QueryFunctionContext) => {
    const userId = queryKey[1];
    if (userId) {
        return getInfinityList(`${COMMENT_ENDPOINTS.GET_USER_COMMENTS}`, pageParam, {
            sort: "createdAt",
        });
    }
    return DEFAULT_LIST_RESPONSE;

};

const getTweetComments = async ({ queryKey, pageParam = 0 }: QueryFunctionContext) => {
    const tweetId = queryKey[1];

    if (tweetId) {
        return getInfinityList(`${COMMENT_ENDPOINTS.BASE}/${tweetId}`, pageParam, {
            sort: "createdAt",
        });
    }

    return DEFAULT_LIST_RESPONSE;
};

const createComment = async ({ newComment, parentId }: {
    newComment: iCreateCommentDTO,
    parentId: string;
}) => {
    if (!parentId)
        return {};
    const response = await client.post(`${COMMENT_ENDPOINTS.BASE}/${parentId}`, newComment);
    return response?.data;
};

const deleteComment = async (id: string) => {
    const response = await client.delete(`${COMMENT_ENDPOINTS.BASE}/${id}`);
    return response?.data;
};

type Props = {
    tweetId?: string;
    userId?: string;
};

export const useComment = ({
    tweetId = "",
    userId = "",
}: Props) => {

    const queryClient = useQueryClient();

    const getMyCommentsQuery = useInfiniteQuery(
        [COMMENT_QUERY.GET_MY_COMMENTS, userId],
        getMyComments,
        INFINITY_QUERY_LIST_CONFIG);

    const getTweetCommentsQuery = useInfiniteQuery(
        [COMMENT_QUERY.GET_TWEET_COMMENTS, tweetId],
        getTweetComments,
        {
            ...INFINITY_QUERY_LIST_CONFIG,
            retry: false
        });

    const invalidateCommentQuery = () => {
        queryClient.invalidateQueries(COMMENT_QUERY.GET_MY_COMMENTS);
        queryClient.invalidateQueries([COMMENT_QUERY.GET_TWEET_COMMENTS, tweetId]);
    };

    const createCommentMutation = useMutation(createComment, {
        onSuccess: () => {
            invalidateCommentQuery();
        },
        retry: false
    });
    const deleteCommentMutation = useMutation(deleteComment, {
        onSuccess: invalidateCommentQuery
    });

    const myComments = getMyCommentsQuery.data;
    const { data, fetchNextPage: fetchMoreTweetComment } = getTweetCommentsQuery;

    const pages = data?.pages;
    const totalTweetComments = pages?.[0].total || 0;

    const tweetComments: iComment[] =
        pages?.reduce(
            (res: iComment[], curr: { data: iComment[]; total: number; }) => [
                ...res,
                ...curr.data,
            ],
            []
        ) || [];

    return {
        myComments,
        tweetComments,
        totalTweetComments,

        fetchMoreTweetComment,

        getMyCommentsQuery,
        getTweetCommentsQuery,

        createCommentMutation,
        deleteCommentMutation
    };
};
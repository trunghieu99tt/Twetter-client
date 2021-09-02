import { QueryFunctionContext, useInfiniteQuery, useMutation, useQueryClient } from "react-query";

// api
import client from "api/client";

// types
import { iCreateCommentDTO } from "@type/comments.types";

// constants
import { COMMENT_ENDPOINTS, COMMENT_QUERY } from "constants/comment.constants";

const LIMIT = 2;

const getMyComments = async ({ queryKey, pageParam = 0 }: QueryFunctionContext) => {
    const userId = queryKey[1];
    if (userId) {
        const response = await client.get(`${COMMENT_ENDPOINTS.GET_USER_COMMENTS}`, {
            params: {
                limit: LIMIT,
                page: pageParam + 1,
                sort: "createdAt+modifiedAt"
            },
        });
        return {
            data: response?.data?.data || [],
            total: response?.data?.total || 0
        }
    }

    return {
        data: [],
        total: 0
    }
}

const getTweetComments = async ({ queryKey, pageParam = 0 }: QueryFunctionContext) => {
    const tweetId = queryKey[1];
    const response = await client.get(`${COMMENT_ENDPOINTS.BASE}/${tweetId}`, {
        params: {
            page: pageParam + 1,
            limit: LIMIT,
            sort: "createdAt"
        },
    });
    return {
        data: response?.data?.data || [],
        total: response?.data?.total || 0
    }
}

const createComment = async ({ newComment, tweetId }: {
    newComment: iCreateCommentDTO,
    tweetId: string;
}) => {
    if (!tweetId)
        return {};
    const response = await client.post(`${COMMENT_ENDPOINTS.BASE}/${tweetId}`, newComment);
    return response?.data;
}

const deleteComment = async (id: string) => {
    const response = await client.delete(`${COMMENT_ENDPOINTS.BASE}/${id}`);
    return response?.data;
}


const infinityListConfig = {
    staleTime: 60 * 60 * 1000, // 1 hour
    getPreviousPageParam: (lastPage: any, pages: any) => {
        return pages.length - 1;
    },
    getNextPageParam: (lastPage: any, pages: any) => {
        const totalPage = lastPage.total / LIMIT;
        return pages.length < totalPage ? pages.length : null;
    }
}


export const useComment = ({
    tweetId = "",
    userId = ""
}) => {

    const queryClient = useQueryClient();

    const getMyCommentsQuery = useInfiniteQuery(
        [COMMENT_QUERY.GET_MY_COMMENTS, userId],
        getMyComments,
        infinityListConfig);

    const getTweetCommentsQuery = useInfiniteQuery(
        [COMMENT_QUERY.GET_TWEET_COMMENTS, tweetId],
        getTweetComments,
        infinityListConfig);

    const createCommentMutation = useMutation(createComment, {
        onSuccess: () => {
            queryClient.invalidateQueries(COMMENT_QUERY.GET_MY_COMMENTS);
            queryClient.invalidateQueries([COMMENT_QUERY.GET_TWEET_COMMENTS, tweetId]);
        }
    });
    const deleteCommentMutation = useMutation(deleteComment, {
        onSuccess: () => {
            queryClient.invalidateQueries(COMMENT_QUERY.GET_MY_COMMENTS);
            queryClient.invalidateQueries([COMMENT_QUERY.GET_TWEET_COMMENTS, tweetId]);
        }
    });

    const myComments = getMyCommentsQuery.data;
    const tweetComments = getTweetCommentsQuery.data;

    return {
        myComments,
        tweetComments,

        getMyCommentsQuery,
        getTweetCommentsQuery,

        createCommentMutation,
        deleteCommentMutation
    }
};
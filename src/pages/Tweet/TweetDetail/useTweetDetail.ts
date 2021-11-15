import { useComment } from "@talons/useComment";
import { useUser } from "@talons/useUser";
import { iTweet } from "@type/tweet.types";
import client from "api/client";
import { COMMENT_QUERY } from "constants/comment.constants";
import { TWEET_ENDPOINTS } from "constants/tweet.constants";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

export const useTweetDetail = () => {
    const history = useHistory();
    const {
        tweetId,
    }: {
        tweetId: string;
    } = useParams();

    const queryClient = useQueryClient();

    const { user } = useUser();

    const { getTweetCommentsQuery } = useComment({
        userId: user?._id,
        tweetId,
    });

    const [data, setData] = useState<iTweet | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getTweetData = async () => {
        try {
            setLoading(true);
            const response = await client.get(
                `${TWEET_ENDPOINTS.BASE}/${tweetId}`
            );
            queryClient.refetchQueries([
                COMMENT_QUERY.GET_TWEET_COMMENTS,
                tweetId,
            ]);
            if (response?.data?.data) {
                setData(response.data.data);
            }
            setLoading(false);
        } catch (error) {
            console.log(`error`, error);
            // toast.error((error as any).message);
            history.push("/");
        }
    };

    useEffect(() => {
        getTweetData();
    }, [tweetId]);

    return {
        data,
        loading,
    };
};

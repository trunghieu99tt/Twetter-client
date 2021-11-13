import { iTweet } from "@type/tweet.types";
import client from "api/client";
import { TWEET_ENDPOINTS } from "constants/tweet.constants";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

export const useTweetDetail = () => {
    const history = useHistory();
    const { tweetId }: {
        tweetId: string;
    } = useParams();

    const [data, setData] = useState<iTweet | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    const getTweetData = async () => {
        try {
            setLoading(true);
            const response = await client.get(`${TWEET_ENDPOINTS.BASE}/${tweetId}`);
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
        loading
    };
};
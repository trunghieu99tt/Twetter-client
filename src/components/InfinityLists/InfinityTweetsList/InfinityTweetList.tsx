import React from "react";

// components
import Tweet from "@components/Tweet/TweetDetail";
import TweetSkeleton from "@components/Tweet/TweetDetail/TweetSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

// types
import { iTweet } from "@type/tweet.types";

interface Props {
    query: any;
}

const InfinityTweetList = ({ query }: Props) => {
    const { data, isLoading, fetchNextPage } = query;

    const pages = data?.pages;
    const totalRecords = pages?.[0].total || 0;

    const myTweets: iTweet[] =
        pages?.reduce(
            (res: iTweet[], curr: { data: iTweet[]; total: number }) => [
                ...res,
                ...curr.data,
            ],
            []
        ) || [];

    const hasMore = myTweets.length < totalRecords;

    return (
        <React.Fragment>
            {isLoading && myTweets.length === 0 && <TweetSkeleton />}
            <InfiniteScroll
                dataLength={myTweets.length}
                next={fetchNextPage}
                hasMore={hasMore}
                loader={<TweetSkeleton />}
            >
                {myTweets?.map((tweet: iTweet) => (
                    <Tweet
                        tweet={tweet}
                        key={`infinity-tweet-list-${tweet._id}`}
                    />
                ))}
            </InfiniteScroll>
        </React.Fragment>
    );
};

export default InfinityTweetList;

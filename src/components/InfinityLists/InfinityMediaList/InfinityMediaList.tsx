import React from "react";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";

// components
import MediaCard from "./MediaCard";
import TweetSkeleton from "@components/Tweet/TweetDetail/TweetSkeleton";

// types
import { iTweet } from "@type/tweet.types";

// constants
import { MASONRY_CONFIG_BREAKPOINTS } from "constants/config.constant";

// styles
import classes from "./infinityMediaList.module.css";

interface Props {
    query: any;
}

const InfinityMediaList = ({ query }: Props) => {
    const { data, fetchNextPage } = query;

    const pages = data?.pages;
    const totalRecords = pages?.[0].total || 0;

    const mediaList: iTweet[] =
        pages?.reduce(
            (res: iTweet[], curr: { data: iTweet[]; total: number }) => {
                const tweetWithMedia = curr?.data?.filter(
                    (tweet) => tweet.media.length > 0
                );
                return [...res, ...tweetWithMedia];
            },
            []
        ) || [];

    const hasMore = mediaList.length < totalRecords;

    return (
        <React.Fragment>
            <InfiniteScroll
                dataLength={mediaList.length}
                next={fetchNextPage}
                hasMore={hasMore}
                loader={<TweetSkeleton />}
            >
                <Masonry
                    className={classes.grid}
                    columnClassName={classes.column}
                    breakpointCols={MASONRY_CONFIG_BREAKPOINTS}
                >
                    {mediaList?.map((tweet: iTweet) => (
                        <MediaCard
                            data={tweet}
                            key={`infinity-media-list-${tweet._id}`}
                        />
                    ))}
                </Masonry>
            </InfiniteScroll>
        </React.Fragment>
    );
};

export default InfinityMediaList;

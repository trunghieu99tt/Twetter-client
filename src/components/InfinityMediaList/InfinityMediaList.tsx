import React from "react";

// components
import TweetSkeleton from "@components/Tweet/TweetSkeleton";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";

// types
import { iTweet } from "@type/tweet.types";

// styles
import classes from "./infinityMediaList.module.css";
import MediaCard from "./MediaCard";

interface Props {
    query: any;
}

const breakpointColumnsObj = {
    default: 3,
    700: 2,
    500: 1,
};

const InfinityMediaList = ({ query }: Props) => {
    const { data, isLoading, fetchNextPage } = query;

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
            {isLoading && mediaList.length === 0 && <TweetSkeleton />}
            <InfiniteScroll
                dataLength={mediaList.length}
                next={fetchNextPage}
                hasMore={hasMore}
                loader={<TweetSkeleton />}
            >
                <Masonry
                    className={classes.grid}
                    columnClassName={classes.column}
                    breakpointCols={breakpointColumnsObj}
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

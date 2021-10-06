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
import { TMedia } from "@type/app.types";
import { v4 } from "uuid";

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
                const tweetWithMedia = curr?.data
                    ?.filter((tweet) => tweet.media.length > 0)
                    ?.reduce((resTweet: any[], tweet: iTweet) => {
                        const mediaUrls = tweet.media;
                        const tweetMedias: TMedia[] = mediaUrls?.map(
                            (url: string, index: number) => {
                                return {
                                    url,
                                    type: url.includes("video")
                                        ? "video"
                                        : "image",
                                    id: `tweet-media-${index}-${v4()}`,
                                };
                            }
                        );
                        tweetMedias?.forEach((media) => {
                            resTweet.push({
                                ...tweet,
                                media,
                            });
                        });
                        return resTweet;
                    }, []);
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
                    {mediaList?.map((tweet: any) => (
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

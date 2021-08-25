// talons
import { useTweet } from "@talons/useTweet";

// components
import Tweet from "@components/Tweet";
import AddTweet from "@components/AddTweet";
import PopularTags from "@components/PopularTags";
import PopularPeople from "@components/PopularPeople";
import InfiniteLoader from "react-window-infinite-loader";

// layout
import MainLayout from "@layout/Main";

// types
import { iTweet } from "@type/tweet.types";

// styles
import { Container } from "@shared/style/sharedStyle.style";
import { Main, Wrapper, Inner, Sidebar } from "./newsFeed.style";
import React from "react";

const NewsFeed = () => {
    const { getMyTweetsQuery, getMyTweetsInfinityQuery } = useTweet();

    const myTweets: iTweet[] =
        getMyTweetsInfinityQuery?.data?.pages.reduce(
            (res: iTweet[], curr: iTweet[]) => [...res, ...curr],
            []
        ) || [];

    const { hasNextPage, data, fetchNextPage } = getMyTweetsInfinityQuery;

    console.log(`data`, data);

    return (
        <Wrapper>
            <Container>
                <Inner>
                    <Main>
                        <AddTweet />
                        <InfiniteLoader
                            loadMoreItems={() => fetchNextPage()}
                            isItemLoaded={(item) => true}
                            itemCount={10}
                        >
                            {({ onItemsRendered, ref }) =>
                                myTweets?.map((tweet: iTweet) => (
                                    <Tweet
                                        tweet={tweet}
                                        key={`newsFeed-tweet-${tweet._id}`}
                                    />
                                )) || <React.Fragment></React.Fragment>
                            }
                        </InfiniteLoader>
                    </Main>
                    <Sidebar>
                        <PopularTags />
                        <PopularPeople />
                    </Sidebar>
                </Inner>
            </Container>
        </Wrapper>
    );
};

export default MainLayout(NewsFeed);

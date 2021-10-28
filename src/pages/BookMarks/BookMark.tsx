import React from "react";

// talons
import { useTweets } from "@talons/useTweets";

// layout
import MainLayout from "@layout/Main";

// components
import InfinityTweetList from "@components/InfinityLists/InfinityTweetsList";

// styles
import { Container, Flex } from "@shared/style/sharedStyle.style";
import { Main, Wrapper, NotFoundText } from "./BookmarkStyle";
import { Helmet } from "react-helmet-async";

const BookMark = () => {
    const { getMySavedTweetsQuery } = useTweets();

    const { data } = getMySavedTweetsQuery;

    const pages = data?.pages;
    const totalRecords = pages?.[0].total || 0;

    return (
        <React.Fragment>
            <Helmet>
                <title>Bookmarks</title>
            </Helmet>
            <Wrapper>
                <Container>
                    <Flex justify="center">
                        {(totalRecords > 0 && (
                            <Main>
                                <InfinityTweetList
                                    query={getMySavedTweetsQuery}
                                />
                            </Main>
                        )) || (
                            <NotFoundText>
                                You haven't had any bookmarks yet.
                            </NotFoundText>
                        )}
                    </Flex>
                </Container>
            </Wrapper>
        </React.Fragment>
    );
};

export default MainLayout(BookMark);

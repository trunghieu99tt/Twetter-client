import React from "react";
import { useQueryClient } from "react-query";
import { Helmet } from "react-helmet-async";

// talons
import { useTweets } from "@talons/useTweets";

// components
import AddTweet from "@components/Tweet/AddTweet";
import StoryList from "@components/Story/StoryList";
import PopularTags from "@components/NewsFeed/PopularTags";
import PopularPeople from "@components/NewsFeed/PopularPeople";
import NotificationList from "@components/Notification/List/NotificationList";
import InfinityTweetsList from "@components/InfinityLists/InfinityTweetsList";

// layout
import MainLayout from "@layout/Main";

// types and constants
import { iUser } from "@type/user.types";
import { USER_QUERY } from "constants/user.constants";

// styles
import {
    Main,
    Wrapper,
    Inner,
    Sidebar,
    RightSidebar,
    Container,
} from "./newsFeed.style";
import PageMetadata from "@components/PageMetadata";

const NewsFeed = () => {
    const user: iUser | undefined = useQueryClient().getQueryData(
        USER_QUERY.GET_ME
    );

    const { getNewsFeedTweetsQuery } = useTweets(user?._id || "");

    return (
        <React.Fragment>
            <PageMetadata title="New feed" />
            <Wrapper>
                <Container>
                    <Inner>
                        <RightSidebar>
                            <NotificationList />
                        </RightSidebar>
                        <Main>
                            <StoryList />
                            <AddTweet />
                            <InfinityTweetsList
                                query={getNewsFeedTweetsQuery}
                            />
                        </Main>
                        <Sidebar>
                            <PopularTags />
                            <PopularPeople />
                        </Sidebar>
                    </Inner>
                </Container>
            </Wrapper>
        </React.Fragment>
    );
};

export default MainLayout(NewsFeed);

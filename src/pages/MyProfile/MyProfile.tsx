import React from "react";
import { useParams } from "react-router";
import { v4 as uuid } from "uuid";
import { Helmet } from "react-helmet-async";

// talons
import { useUser } from "@talons/useUser";
import { useTweets } from "@talons/useTweets";

// layout
import MainLayout from "@layout/Main";

// components
import AddTweet from "@components/Tweet/AddTweet";
import LeftSidebar from "@components/Sidebar/LeftSidebar";
import InfinityTweetList from "@components/InfinityLists/InfinityTweetsList";
import MyProfileOverview from "@components/MyProfile/MyProfileOverview";

// styles
import { Sidebar, Wrapper, Main, Content } from "./MyProfileStyle";
import { Container } from "@shared/style/sharedStyle.style";
import PageMetadata from "@components/PageMetadata";

const MyProfile = () => {
    const params: { userId: string } = useParams();
    const { userId } = params;

    const { getProfileTweetsQuery } = useTweets(userId);
    const { user: me, getUserQuery } = useUser(userId);

    const userData = userId === me?._id ? me : getUserQuery.data;
    const isMe = userId === me?._id;

    if (!userData) return null;

    return (
        <React.Fragment>
            <PageMetadata title={`${userData.name}'s profile`} />
            <Wrapper>
                <MyProfileOverview user={userData} />
                <Container>
                    <Content>
                        <Sidebar>
                            <LeftSidebar type="PROFILE" />
                        </Sidebar>
                        <Main>
                            {isMe && <AddTweet />}
                            <InfinityTweetList query={getProfileTweetsQuery} />
                        </Main>
                    </Content>
                </Container>
            </Wrapper>
        </React.Fragment>
    );
};

export default MainLayout(MyProfile);

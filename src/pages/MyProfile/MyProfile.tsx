import React from "react";
import { useParams } from "react-router";

// talons
import { useUser } from "@talons/useUser";
import { useTweets } from "@talons/useTweets";

// layout
import MainLayout from "@layout/Main";

// components
import { Spinner1 } from "@components/Loaders";
import AddTweet from "@components/Tweet/AddTweet";
import PageMetadata from "@components/PageMetadata";
import LeftSidebar from "@components/Sidebar/LeftSidebar";
import InfinityTweetList from "@components/InfinityLists/InfinityTweetsList";
import MyProfileOverview from "@components/MyProfile/MyProfileOverview";

// styles
import { Sidebar, Wrapper, Main, Content } from "./MyProfileStyle";
import { Container } from "@shared/style/sharedStyle.style";

const MyProfile = () => {
    const params: { userId: string } = useParams();
    const { userId } = params;

    const { getProfileTweetsQuery } = useTweets(userId);
    const { user: me, getUserQuery } = useUser(userId);

    const userData = userId === me?._id ? me : getUserQuery.data;
    const isMe = userId === me?._id;

    if (getUserQuery?.isLoading) {
        return <Spinner1 />;
    }

    if (!userData) return null;

    return (
        <React.Fragment>
            <PageMetadata title={`${userData.name}`} />
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

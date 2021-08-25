// talons
import { useTweet } from "@talons/useTweet";

// layout
import MainLayout from "@layout/Main";

// components
import Tweet from "@components/Tweet";
import LeftSidebar from "@components/LeftSidebar";
import MyProfileOverview from "@components/MyProfileOverview";

// styles
import { Sidebar, Wrapper, Main, Content } from "./MyProfileStyle";
import { Container } from "@shared/style/sharedStyle.style";
import { iTweet } from "@type/tweet.types";

const MyProfile = () => {
    const { getMyTweetsQuery } = useTweet();

    const myTweets: iTweet[] = (getMyTweetsQuery?.data || []) as iTweet[];

    return (
        <Wrapper>
            <MyProfileOverview />
            <Container>
                <Content>
                    <Sidebar>
                        <LeftSidebar type="PROFILE" />
                    </Sidebar>
                    <Main>
                        {myTweets?.length > 0 &&
                            myTweets.map((tweet: iTweet) => (
                                <Tweet
                                    tweet={tweet}
                                    key={`MyProfile-tweet-${tweet._id}`}
                                />
                            ))}
                    </Main>
                </Content>
            </Container>
        </Wrapper>
    );
};

export default MainLayout(MyProfile);

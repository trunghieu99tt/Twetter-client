import { useParams } from "react-router";

// talons
import { useUser } from "@talons/useUser";
import { useTweet } from "@talons/useTweet";

// layout
import MainLayout from "@layout/Main";

// components
import LeftSidebar from "@components/LeftSidebar";
import InfinityTweetList from "@components/InfinityTweetsList";
import MyProfileOverview from "@components/MyProfileOverview";

// styles
import { Sidebar, Wrapper, Main, Content } from "./MyProfileStyle";
import { Container } from "@shared/style/sharedStyle.style";

const MyProfile = () => {
    const params: { userId: string } = useParams();
    const { userId } = params;

    const { getProfileTweetsQuery } = useTweet(userId);
    const { user: me, getUserQuery } = useUser(userId);

    const userData = userId === me?.id ? me : getUserQuery.data;
    const isMe = userId === me?.id;

    if (!userData) return null;

    return (
        <Wrapper>
            <MyProfileOverview user={userData} isMe={isMe} />
            <Container>
                <Content>
                    <Sidebar>
                        <LeftSidebar type="PROFILE" />
                    </Sidebar>
                    <Main>
                        <InfinityTweetList query={getProfileTweetsQuery} />
                    </Main>
                </Content>
            </Container>
        </Wrapper>
    );
};

export default MainLayout(MyProfile);

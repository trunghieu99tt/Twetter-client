import { useParams } from "react-router";

// talons
import { useUser } from "@talons/useUser";
import { useTweets } from "@talons/useTweets";

// layout
import MainLayout from "@layout/Main";

// components
import LeftSidebar from "@components/Sidebar/LeftSidebar";
import MyProfileOverview from "@components/MyProfileOverview";
import InfinityTweetsList from "@components/InfinityTweetsList";

// styles
import { Wrapper, Content, Main, Sidebar } from "./UserLikesStyles";
import { Container } from "@shared/style/sharedStyle.style";

const UserLikes = () => {
    const params: { userId: string } = useParams();
    const { userId } = params;

    const { getProfileLikedTweetsQuery } = useTweets(userId);
    const { user: me, getUserQuery } = useUser(userId);

    const userData = userId === me?._id ? me : getUserQuery.data;
    const isMe = userId === me?._id;

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
                        <InfinityTweetsList
                            query={getProfileLikedTweetsQuery}
                        />
                    </Main>
                </Content>
            </Container>
        </Wrapper>
    );
};

export default MainLayout(UserLikes);

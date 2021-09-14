import { useParams } from "react-router";

// talons
import { useUser } from "@talons/useUser";
import { useTweets } from "@talons/useTweets";

// layout
import MainLayout from "@layout/Main";

// components
import LeftSidebar from "@components/Sidebar/LeftSidebar";
import MyProfileOverview from "@components/MyProfile/MyProfileOverview";
import InfinityMediaList from "@components/InfinityLists/InfinityMediaList";

// styles
import { Wrapper, Content, Main, Sidebar } from "./userMediaStyle";
import { Container } from "@shared/style/sharedStyle.style";

const UserMedia = () => {
    const params: { userId: string } = useParams();
    const { userId } = params;

    const { getProfileTweetsQuery } = useTweets(userId);
    const { user: me, getUserQuery } = useUser(userId);

    const userData = userId === me?._id ? me : getUserQuery.data;

    if (!userData) return null;

    return (
        <Wrapper>
            <MyProfileOverview user={userData} />
            <Container>
                <Content>
                    <Sidebar>
                        <LeftSidebar type="PROFILE" />
                    </Sidebar>
                    <Main>
                        <InfinityMediaList query={getProfileTweetsQuery} />
                    </Main>
                </Content>
            </Container>
        </Wrapper>
    );
};

export default MainLayout(UserMedia);

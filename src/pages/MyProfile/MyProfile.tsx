// layout
import MainLayout from "@layout/Main";

// components
import Tweet from "@components/Tweet";
import LeftSidebar from "@components/LeftSidebar";
import MyProfileOverview from "@components/MyProfileOverview";

// styles
import { Sidebar, Wrapper, Main, Content } from "./MyProfileStyle";
import { Container } from "@shared/style/sharedStyle.style";

interface Props {}

const MyProfile = (props: Props) => {
    return (
        <Wrapper>
            <MyProfileOverview />
            <Container>
                <Content>
                    <Sidebar>
                        <LeftSidebar type="PROFILE" />
                    </Sidebar>
                    <Main>
                        {[...Array(10)].map((_, i) => (
                            <Tweet key={i} />
                        ))}
                    </Main>
                </Content>
            </Container>
        </Wrapper>
    );
};

export default MainLayout(MyProfile);

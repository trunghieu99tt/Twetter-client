// layout
import MainLayout from "@layout/Main";

// components
import Tweet from "@components/Tweet";
import LeftSidebar from "@components/LeftSidebar";

// styles
import { Container, Flex } from "@shared/style/sharedStyle.style";
import { Main, Wrapper } from "./BookmarkStyle";

const BookMark = () => {
    return (
        <Wrapper>
            <Container>
                <Flex>
                    <div>
                        <LeftSidebar type="PROFILE" />
                    </div>
                    <Main>
                        {/* {[...Array(10)].map((_, i) => (
                            <Tweet key={i} />
                        ))} */}
                    </Main>
                </Flex>
            </Container>
        </Wrapper>
    );
};

export default MainLayout(BookMark);

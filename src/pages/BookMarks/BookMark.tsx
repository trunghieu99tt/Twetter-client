// talons
import { useTweets } from "@talons/useTweets";

// layout
import MainLayout from "@layout/Main";

// components
import InfinityTweetList from "@components/InfinityLists/InfinityTweetsList";

// styles
import { Container, Flex } from "@shared/style/sharedStyle.style";
import { Main, Wrapper } from "./BookmarkStyle";

const BookMark = () => {
    const { getMySavedTweetsQuery } = useTweets();

    return (
        <Wrapper>
            <Container>
                <Flex>
                    <Main>
                        <InfinityTweetList query={getMySavedTweetsQuery} />
                    </Main>
                </Flex>
            </Container>
        </Wrapper>
    );
};

export default MainLayout(BookMark);

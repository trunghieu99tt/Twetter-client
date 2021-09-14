import { useQueryClient } from "react-query";

// talons
import { useTweets } from "@talons/useTweets";

// components
import AddTweet from "@components/Tweet/AddTweet";
import PopularPeople from "@components/NewsFeed/PopularPeople";
import InfinityTweetsList from "@components/InfinityLists/InfinityTweetsList";

// layout
import MainLayout from "@layout/Main";

// types and constants
import { iUser } from "@type/user.types";
import { USER_QUERY } from "constants/user.constants";

// styles
import { Container } from "@shared/style/sharedStyle.style";
import { Main, Wrapper, Inner, Sidebar } from "./newsFeed.style";

const NewsFeed = () => {
    const user: iUser | undefined = useQueryClient().getQueryData(
        USER_QUERY.GET_ME
    );

    const { getNewsFeedTweetsQuery } = useTweets(user?._id || "");

    return (
        <Wrapper>
            <Container>
                <Inner>
                    <Main>
                        <AddTweet />
                        <InfinityTweetsList query={getNewsFeedTweetsQuery} />
                    </Main>
                    <Sidebar>
                        {/* <PopularTags /> */}
                        <PopularPeople />
                    </Sidebar>
                </Inner>
            </Container>
        </Wrapper>
    );
};

export default MainLayout(NewsFeed);

// talons
import { useTweets } from "@talons/useTweets";

// components
import AddTweet from "@components/AddTweet";
import PopularTags from "@components/PopularTags";
import PopularPeople from "@components/PopularPeople";
import InfinityTweetsList from "@components/InfinityTweetsList";

// layout
import MainLayout from "@layout/Main";

// styles
import { Container } from "@shared/style/sharedStyle.style";
import { Main, Wrapper, Inner, Sidebar } from "./newsFeed.style";
import { useQueryClient } from "react-query";
import { USER_QUERY } from "constants/user.constants";
import { iUser } from "@type/user.types";

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

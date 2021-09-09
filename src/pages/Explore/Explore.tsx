import InfinityMediaList from "@components/InfinityLists/InfinityMediaList";
import InfinityPeopleList from "@components/InfinityLists/InfinityPeopleList";
import InfinityTweetList from "@components/InfinityLists/InfinityTweetsList";
import LeftSidebar from "@components/Sidebar/LeftSidebar";
import MainLayout from "@layout/Main";
import { Container } from "@shared/style/sharedStyle.style";
import { useTweets } from "@talons/useTweets";
import { useUser } from "@talons/useUser";
import { useParams } from "react-router";

// styles
import { Wrapper, Content, Sidebar, Main } from "./ExploreStyle";

const Explore = () => {
    const params: { page: string } = useParams();
    const { page } = params;

    const { getPopularTweetsQuery, getLatestTweetsQuery, getMediasQuery } =
        useTweets();
    const { getPopularUsersQuery } = useUser();

    let query = null;

    switch (page) {
        case "popular":
            query = getPopularTweetsQuery;
            break;
        case "latest":
            query = getLatestTweetsQuery;
            break;
        case "media":
            query = getMediasQuery;
            break;
        case "people":
            query = getPopularUsersQuery;
            break;
        default:
            query = getPopularTweetsQuery;
            break;
    }

    let mainComponent = <InfinityTweetList query={query} />;

    switch (page) {
        case "people":
            mainComponent = <InfinityPeopleList query={query} />;
            break;
        case "media":
            mainComponent = <InfinityMediaList query={query} />;
            break;
        default:
            mainComponent = <InfinityTweetList query={query} />;
            break;
    }

    return (
        <Wrapper>
            <Container>
                <Content>
                    <Sidebar>
                        <LeftSidebar type="NEWS_FEED" />
                    </Sidebar>
                    <Main>{mainComponent}</Main>
                </Content>
            </Container>
        </Wrapper>
    );
};

export default MainLayout(Explore);

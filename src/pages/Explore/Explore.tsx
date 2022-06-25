import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

// talons
import { useUser } from "@talons/useUser";
import { useTweetQuery } from "@talons/useTweetQuery";

// layout
import MainLayout from "@layout/Main";

// components
import LeftSidebar from "@components/Sidebar/LeftSidebar";
import InfinityMediaList from "@components/InfinityLists/InfinityMediaList";
import InfinityTweetList from "@components/InfinityLists/InfinityTweetsList";
import InfinityPeopleList from "@components/InfinityLists/InfinityPeopleList";

// styles
import { Container } from "@shared/style/sharedStyle.style";
import { Wrapper, Content, Sidebar, Main } from "./ExploreStyle";

const Explore = () => {
  const { t } = useTranslation();
  const params: { page: string } = useParams();
  const { page } = params;

  const { getPopularTweetsQuery, getLatestTweetsQuery, getMediasQuery } =
    useTweetQuery();
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
      <Helmet>
        <title>{t("explore")}</title>
      </Helmet>
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

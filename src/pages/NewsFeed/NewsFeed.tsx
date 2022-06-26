import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

// talons
import { useTweetQuery } from "@talons/useTweetQuery";

// components
import InfinityTweetsList from "@components/InfinityLists/InfinityTweetsList";
import PopularPeople from "@components/NewsFeed/PopularPeople";
import PopularTags from "@components/NewsFeed/PopularTags";
import NotificationList from "@components/Notification/List/NotificationList";
import StoryList from "@components/Story/StoryList";
import AddTweet from "@components/Tweet/AddTweet";

// layout
import MainLayout from "@layout/Main";

// types and constants
import { iUser } from "@type/user.types";
import { USER_QUERY } from "constants/user.constants";

// styles
import PageMetadata from "@components/PageMetadata";
import {
  Container,
  Inner,
  Main,
  RightSidebar,
  Sidebar,
  Wrapper,
} from "./newsFeed.style";
import { useWindowSize } from "@hooks/useWindowSize";

const NewsFeed = () => {
  const { t } = useTranslation();

  const user: iUser | undefined = useQueryClient().getQueryData(
    USER_QUERY.GET_ME
  );

  const { getNewsFeedTweetsQuery } = useTweetQuery(user?._id || "");
  const windowSize = useWindowSize();

  return (
    <React.Fragment>
      <PageMetadata title={t("newsFeed")} />
      <Wrapper>
        <Container>
          <Inner>
            {windowSize && windowSize.width && windowSize.width > 1024 && (
              <RightSidebar>
                <NotificationList />
              </RightSidebar>
            )}
            <Main>
              <StoryList />
              <AddTweet />
              <InfinityTweetsList query={getNewsFeedTweetsQuery} />
            </Main>
            <Sidebar>
              <PopularTags />
              <PopularPeople />
            </Sidebar>
          </Inner>
        </Container>
      </Wrapper>
    </React.Fragment>
  );
};

export default MainLayout(memo(NewsFeed));

import React from "react";
import { useTranslation } from "react-i18next";

// talons
import { useTweetQuery } from "@talons/useTweetQuery";

// layout
import MainLayout from "@layout/Main";

// components
import InfinityTweetList from "@components/InfinityLists/InfinityTweetsList";

// styles
import { Container, Flex } from "@shared/style/sharedStyle.style";
import { Main, Wrapper, NotFoundText } from "./BookmarkStyle";
import { Helmet } from "react-helmet-async";

const BookMark = () => {
  const { getMySavedTweetsQuery } = useTweetQuery();
  const { t } = useTranslation();

  const { data } = getMySavedTweetsQuery;

  const pages = data?.pages;
  const totalRecords = pages?.[0].total || 0;

  return (
    <React.Fragment>
      <Helmet>
        <title>{t("bookmark")}</title>
      </Helmet>
      <Wrapper>
        <Container>
          <Flex justify="center">
            {(totalRecords > 0 && (
              <Main>
                <InfinityTweetList query={getMySavedTweetsQuery} />
              </Main>
            )) || <NotFoundText>{t("emptyBookmark")}</NotFoundText>}
          </Flex>
        </Container>
      </Wrapper>
    </React.Fragment>
  );
};

export default MainLayout(BookMark);

import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

// talons
import { useUser } from "@talons/useUser";
import { useTweetQuery } from "@talons/useTweetQuery";

// layout
import MainLayout from "@layout/Main";

// components
import LeftSidebar from "@components/Sidebar/LeftSidebar";
import MyProfileOverview from "@components/MyProfile/MyProfileOverview";
import InfinityTweetsList from "@components/InfinityLists/InfinityTweetsList";

// styles
import { Wrapper, Content, Main, Sidebar } from "./UserLikesStyles";
import { Container } from "@shared/style/sharedStyle.style";
import PageMetadata from "@components/PageMetadata";

const UserLikes = () => {
  const { t } = useTranslation();
  const params: { userId: string } = useParams();
  const { userId } = params;

  const { getProfileLikedTweetsQuery } = useTweetQuery(userId);
  const { user: me, getUserQuery } = useUser(userId);

  const userData = userId === me?._id ? me : getUserQuery.data;

  if (!userData) return null;

  return (
    <React.Fragment>
      <PageMetadata title={`${userData.name}'s ${t("liked")} ${t("tweet")}`} />
      <Wrapper>
        <MyProfileOverview user={userData} />
        <Container>
          <Content>
            <Sidebar>
              <LeftSidebar type="PROFILE" />
            </Sidebar>
            <Main>
              <InfinityTweetsList query={getProfileLikedTweetsQuery} />
            </Main>
          </Content>
        </Container>
      </Wrapper>
    </React.Fragment>
  );
};

export default MainLayout(UserLikes);

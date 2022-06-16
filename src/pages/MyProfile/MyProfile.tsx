import React from "react";
import { useHistory, useParams } from "react-router";
import { useTweets } from "@talons/useTweets";
import { useUser } from "@talons/useUser";
import MainLayout from "@layout/Main";
import InfinityTweetList from "@components/InfinityLists/InfinityTweetsList";
import { Spinner1 } from "@components/Loaders";
import MyProfileOverview from "@components/MyProfile/MyProfileOverview";
import PageMetadata from "@components/PageMetadata";
import LeftSidebar from "@components/Sidebar/LeftSidebar";
import AddTweet from "@components/Tweet/AddTweet";
import { Container } from "@shared/style/sharedStyle.style";
import { toast } from "react-toastify";
import { Content, Main, Sidebar, Wrapper } from "./MyProfileStyle";

const MyProfile = () => {
  const params: { userId: string } = useParams();
  const history = useHistory();
  const { userId } = params;

  const { getProfileTweetsQuery } = useTweets(userId);
  const { user: me, getUserQuery } = useUser(userId);

  const userData = userId === me?._id ? me : getUserQuery.data;
  const isMe = userId === me?._id;

  if (getUserQuery.error) {
    const errorMessage = (getUserQuery as any)?.error?.response?.data?.error;
    toast.error(errorMessage);
    history.push("/");
  }

  if (getUserQuery?.isLoading) {
    return <Spinner1 />;
  }

  if (!userData) return null;

  return (
    <React.Fragment>
      <PageMetadata title={`${userData.name}`} />
      <Wrapper>
        <MyProfileOverview user={userData} />
        <Container>
          <Content>
            <Sidebar>
              <LeftSidebar type="PROFILE" />
            </Sidebar>
            <Main>
              {isMe && <AddTweet />}
              <InfinityTweetList query={getProfileTweetsQuery} />
            </Main>
          </Content>
        </Container>
      </Wrapper>
    </React.Fragment>
  );
};

export default MainLayout(MyProfile);

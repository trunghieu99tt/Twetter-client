import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

// talons
import { useUser } from "@talons/useUser";
import { useTweets } from "@talons/useTweets";

// layout
import MainLayout from "@layout/Main";

// components
import PageMetadata from "@components/PageMetadata";
import LeftSidebar from "@components/Sidebar/LeftSidebar";
import MyProfileOverview from "@components/MyProfile/MyProfileOverview";
import InfinityMediaList from "@components/InfinityLists/InfinityMediaList";

// styles
import { Container } from "@shared/style/sharedStyle.style";
import { Wrapper, Content, Main, Sidebar } from "./userMediaStyle";

const UserMedia = () => {
    const { t } = useTranslation();
    const params: { userId: string } = useParams();
    const { userId } = params;

    const { getUserMediasQuery } = useTweets(userId);
    const { user: me, getUserQuery } = useUser(userId);

    const userData = userId === me?._id ? me : getUserQuery.data;

    if (!userData) return null;

    return (
        <React.Fragment>
            <PageMetadata title={`${userData.name}'s ${t("media")}`} />

            <Wrapper>
                <MyProfileOverview user={userData} />
                <Container>
                    <Content>
                        <Sidebar>
                            <LeftSidebar type="PROFILE" />
                        </Sidebar>
                        <Main>
                            <InfinityMediaList query={getUserMediasQuery} />
                        </Main>
                    </Content>
                </Container>
            </Wrapper>
        </React.Fragment>
    );
};

export default MainLayout(UserMedia);

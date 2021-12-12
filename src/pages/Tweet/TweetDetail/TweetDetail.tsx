import React from "react";
import styled from "styled-components";

// talons
import { useTweetDetail } from "./useTweetDetail";

// layout
import MainLayout from "@layout/Main";

// components
import { Spinner1 } from "@components/Loaders";
import Tweet from "@components/Tweet/TweetDetail";
import PageMetadata from "@components/PageMetadata";

// constants
import { MAX_LENGTH_TWEET_META_HEADING } from "constants/app.constants";
import { useTranslation } from "react-i18next";
import { Container } from "@shared/style/sharedStyle.style";

const Wrapper = styled.div`
    max-width: 70rem;
    margin: 0 auto;
    margin-top: 2rem;
`;

const TweetNotFound = styled.div`
    display: flex;
    align-items: center;
    height: 100vh;
    justify-content: center;
    font-size: 2rem;
    font-weight: 500;
    color: var(--red);
`;

const TweetDetail = () => {
    const { data, loading } = useTweetDetail();
    const { t } = useTranslation();

    if (loading) return <Spinner1 />;

    if (!data)
        return (
            <React.Fragment>
                <PageMetadata title={t("tweetNotFound")} />
                <TweetNotFound>
                    This tweet has been deleted or does not exist.
                </TweetNotFound>
            </React.Fragment>
        );

    return (
        <React.Fragment>
            <PageMetadata
                title={`${data?.content?.slice(
                    0,
                    MAX_LENGTH_TWEET_META_HEADING
                )}`}
                description={data?.content}
                image={data?.media?.[0]}
            />
            <Container>
                <Wrapper>
                    <Tweet tweet={data!} />
                </Wrapper>
            </Container>
        </React.Fragment>
    );
};

export default MainLayout(TweetDetail);

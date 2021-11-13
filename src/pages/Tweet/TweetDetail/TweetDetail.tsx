import React from "react";
import styled from "styled-components";

// talons
import { useTweetDetail } from "./useTweetDetail";

// layout
import MainLayout from "@layout/Main";

// components
import Tweet from "@components/Tweet/TweetDetail";
import PageMetadata from "@components/PageMetadata";

// constants
import { MAX_LENGTH_TWEET_META_HEADING } from "constants/app.constants";
import NotFound from "@pages/NotFound";
import { Spinner1 } from "@components/Loaders";

const Wrapper = styled.div`
    margin-top: 2rem;
`;

const TweetDetail = () => {
    const { data, loading } = useTweetDetail();

    if (loading) return <Spinner1 />;

    if (!data) return <NotFound />;

    return (
        <React.Fragment>
            <PageMetadata
                title={`${data?.content.slice(
                    0,
                    MAX_LENGTH_TWEET_META_HEADING
                )}`}
                description={data?.content}
                image={data?.media?.[0]}
            />
            <Wrapper>
                <Tweet tweet={data!} />
            </Wrapper>
        </React.Fragment>
    );
};

export default MainLayout(TweetDetail);

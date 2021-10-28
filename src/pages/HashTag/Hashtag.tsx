import InfinityTweetsList from "@components/InfinityLists/InfinityTweetsList";
import { useTweets } from "@talons/useTweets";
import { useParams } from "react-router";
// layout
import MainLayout from "@layout/Main";

import classes from "./hashtag.module.css";
import React from "react";
import PageMetadata from "@components/PageMetadata";

interface Props {}

const Hashtag = (props: Props) => {
    const params: { hashtag: string } = useParams();
    const { hashtag } = params;

    const { getTweetsByTagQuery } = useTweets(undefined, hashtag);

    return (
        <React.Fragment>
            <PageMetadata title={`#${hashtag} tweets`} />
            <div className={classes.root}>
                <p className={classes.heading}>
                    All tweets with hashtag <span>#{hashtag}</span>
                </p>
                <InfinityTweetsList query={getTweetsByTagQuery} />
            </div>
        </React.Fragment>
    );
};

export default MainLayout(Hashtag);

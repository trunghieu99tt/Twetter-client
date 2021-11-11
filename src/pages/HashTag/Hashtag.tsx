import React from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

// talons
import { useTweets } from "@talons/useTweets";

// layout
import MainLayout from "@layout/Main";

// components
import PageMetadata from "@components/PageMetadata";
import InfinityTweetsList from "@components/InfinityLists/InfinityTweetsList";

// styles
import classes from "./hashtag.module.css";

const Hashtag = () => {
    const { t } = useTranslation();
    const params: { hashtag: string } = useParams();
    const { hashtag } = params;

    const { getTweetsByTagQuery } = useTweets(undefined, hashtag);

    return (
        <React.Fragment>
            <PageMetadata title={`#${hashtag} ${t("tweet")}`} />
            <div className={classes.root}>
                <p className={classes.heading}>
                    {t("allTweetByHashtag")} <span>#{hashtag}</span>
                </p>
                <InfinityTweetsList query={getTweetsByTagQuery} />
            </div>
        </React.Fragment>
    );
};

export default MainLayout(Hashtag);

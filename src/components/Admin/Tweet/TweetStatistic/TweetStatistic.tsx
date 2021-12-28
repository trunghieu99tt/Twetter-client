import BaseView from "@layout/Admin/BaseView";
import React from "react";
import BarChart from "../../CompareChart/BarChart";
import PieChart from "../../CompareChart/PieChart";

import classes from "./tweetStatistic.module.css";
import { useTweetStatistics } from "./useTweetStatistic";

interface Props {}

const TweetStatistic = (props: Props) => {
    const { tweetCharts, tagChart, onEventTag, onEventTweet } =
        useTweetStatistics();

    const { mostLikedTweetChart, mostSavedTweetChart, mostRetweetedChart } =
        tweetCharts;

    return (
        <div className={classes.root}>
            {mostLikedTweetChart && (
                <div className={classes.child}>
                    <BarChart
                        title="Tweet được thích nhiều nhất"
                        option={mostLikedTweetChart}
                        width={"100%"}
                        onEvents={onEventTweet}
                    />
                </div>
            )}
            {mostSavedTweetChart && (
                <div className={classes.child}>
                    <BarChart
                        title="Tweet được lưu nhiều nhất"
                        option={mostSavedTweetChart}
                        width={"100%"}
                        onEvents={onEventTweet}
                    />
                </div>
            )}
            {mostRetweetedChart && (
                <div className={classes.child}>
                    <BarChart
                        title="Tweet được chia sẻ nhiều nhất"
                        option={mostRetweetedChart}
                        width={"100%"}
                        onEvents={onEventTweet}
                    />
                </div>
            )}
            {tagChart && (
                <div className={classes.child}>
                    <PieChart
                        title="Hashtag được dùng nhiều nhất"
                        option={tagChart}
                        width={"100%"}
                        onEvents={onEventTag}
                    />
                </div>
            )}
        </div>
    );
};

export default BaseView(TweetStatistic);

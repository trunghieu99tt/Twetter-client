import client from "api/client";
import { useEffect, useState } from "react";

export const useTweetStatistics = () => {
    const [tweetCharts, setTweetCharts] = useState<any>({});
    const [tagChart, setTagChart] = useState<any>({});
    const [tweets, setTweets] = useState<any>([]);
    const [tags, setTags] = useState<any>([]);

    useEffect(() => {
        getTweetStatistics();
        getMostPopularTags();
    }, []);

    const generateSortedBarChartData = (data: any, sortField: string) => {
        return {
            dataset: [
                {
                    dimensions: ["content", sortField],
                    source: [...data],
                },
                {
                    transform: {
                        type: "sort",
                        config: { dimension: sortField, order: "desc" },
                    },
                },
            ],
            series: {
                type: "bar",
                encode: { x: "content", y: sortField },
                datasetIndex: 1,
            },
        };
    };

    const generateTweetChart = (data: any, dataSlice: string, attr: string) => {
        const chartData = data[dataSlice]?.map((e: any) => {
            return [
                e?.content?.slice(0, Math.min(e?.content?.length, 10)) || "",
                e[attr] || 0,
            ];
        });
        return generateSortedBarChartData(chartData, attr);
    };

    const generateMostLikedTweetChart = (data: any) => {
        return generateTweetChart(data, "mostLikedTweets", "likes_count");
    };

    const generateMostSavedTweetChart = (data: any) => {
        return generateTweetChart(data, "mostSavedTweets", "save_count");
    };

    const generateMostRetweetedChart = (data: any) => {
        return generateTweetChart(
            data,
            "mostRetweetedTweets",
            "retweeted_count"
        );
    };

    const generateTweetStatisticCharts = (data: any) => {
        return {
            mostLikedTweetChart: generateMostLikedTweetChart(data),
            mostSavedTweetChart: generateMostSavedTweetChart(data),
            mostRetweetedChart: generateMostRetweetedChart(data),
        };
    };

    const generateTagChart = (data: any) => {
        const newOption = {
            series: [
                {
                    type: "pie",
                    radius: "50%",
                    data: data?.map((e: any) => ({
                        name: e?.name || "",
                        value: e?.count || 0,
                    })),
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        };
        setTagChart(newOption);
    };

    const getTweetStatistics = async () => {
        const response = await client.get("/tweet/tweet-statistic");
        const data = response?.data?.data || {};
        const {
            mostLikedTweets = [],
            mostSavedTweets = [],
            mostRetweetedTweets = [],
        } = data;

        setTweets([
            ...mostLikedTweets,
            ...mostSavedTweets,
            ...mostRetweetedTweets,
        ]);

        setTweetCharts(generateTweetStatisticCharts(data));
    };

    const getMostPopularTags = async () => {
        const response = await client.get("/hashtag/most-popular");
        const data = response?.data?.data || [];
        setTags(data);
        generateTagChart(response?.data?.data);
    };

    const findTweet = (contentStartWith: string) => {
        const tweet = tweets?.find((e: any) => {
            return e?.content?.startsWith(contentStartWith);
        });

        return tweet;
    };

    const findHashtag = (name: string) => {
        const hashtag = tags?.find((e: any) => {
            return e?.name === name;
        });

        return hashtag;
    };

    const onClickTweet = (params: any) => {
        const tweet = findTweet(params.value);
        console.log(`tweet`, tweet);
        if (tweet?._id) {
            window.open(
                `/tweet/${tweet._id}`,
                "_blank",
                "noopener, noreferrer"
            );
        }
    };

    const onClickHashtag = (param: any) => {
        const tag = findHashtag(param.name);
        if (tag?.name) {
            window.open(
                `/hashtags/${tag.name}`,
                "_blank",
                "noopener, noreferrer"
            );
        }
    };

    const onEventTweet = {
        click: onClickTweet,
    };

    const onEventTag = {
        click: onClickHashtag,
    };

    return {
        tagChart,
        tweetCharts,
        onEventTag,
        onEventTweet,
    };
};

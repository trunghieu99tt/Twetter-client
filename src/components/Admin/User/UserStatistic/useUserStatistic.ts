import client from "api/client";
import React, { useEffect } from "react";

export const useUserStatistic = () => {
    const [mostActiveUsersDataForChart, setMostActiveUsersForChart] =
        React.useState<any>({});
    const [mostPopularUsersForChart, setMostPopularUsersForChart] =
        React.useState<any>({});
    const [mostActiveUsers, setMostActiveUsers] = React.useState<any>({});
    const [mostPopularUsers, setMostPopularUsers] = React.useState<any>({});

    useEffect(() => {
        getMostActiveUser();
        getMostPopularUser();
    }, []);

    const generateMostPopularUserDataForChart = (data: any) => {
        const yAxisData = data?.map((e: any) => e.name).reverse();
        const seriesData = [
            {
                name: "Followers",
                type: "bar",
                data: data?.map((e: any) => e.followers.length).reverse(),
            },
            {
                name: "Following",
                type: "bar",
                data: data?.map((e: any) => e.following.length).reverse(),
            },
        ];

        return {
            xAxis: {
                type: "value",
                boundaryGap: [0, 0.01],
            },
            yAxis: {
                type: "category",
                data: yAxisData,
                triggerEvent: true,
            },
            series: seriesData,
        };
    };

    const generateMostActiveUserDataForChart = (data: any) => {
        const yAxisData = data?.map((e: any) => e?.user?.name);

        const seriesData = [
            {
                name: "Tweets",
                type: "bar",
                data: data?.map((e: any) => e.tweetCount),
            },
        ];

        return {
            xAxis: {
                type: "value",
                boundaryGap: [0, 0.01],
            },
            yAxis: {
                type: "category",
                data: yAxisData,
                triggerEvent: true,
            },
            series: seriesData,
        };
    };

    const getMostActiveUser = async () => {
        const response = await client.get("/user/most-active");
        const data = response?.data?.data || [];
        setMostActiveUsers(data);
        setMostActiveUsersForChart(generateMostActiveUserDataForChart(data));
    };

    const getMostPopularUser = async () => {
        const response = await client.get("/user/popular", {
            params: {
                page: 1,
                limit: 10,
            },
        });
        const data = response?.data?.data || [];
        setMostPopularUsers(data);
        setMostPopularUsersForChart(generateMostPopularUserDataForChart(data));
    };

    const findUser = (name: string) => {
        let user = mostPopularUsers.find((e: any) => e?.name === name);
        if (!user)
            user = mostActiveUsers.find(
                (e: any) => e?.user?.name === name
            )?.user;
        return user;
    };

    const onChartClick = (params: any) => {
        const user = findUser(params.value);
        if (user?._id) {
            window.open(
                `/profile/${user._id}`,
                "_blank",
                "noopener,noreferrer"
            );
        }
    };

    const onEvents = {
        click: onChartClick,
    };

    return {
        onEvents,
        mostPopularUsersForChart,
        mostActiveUsersDataForChart,
    };
};

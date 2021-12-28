import React from "react";
import { merge } from "lodash";
import ReactEcharts from "echarts-for-react";

interface Props {
    title: string;
    option?: object;
    height?: number | string;
    width?: number | string;
    padding?: number | string;
    onEvents: any;
}

const HorizontalChart = ({
    title,
    option = {},
    height = 500,
    width = 500,
    padding = 0,
    onEvents,
}: Props) => {
    const defaultOption = {
        title: {
            text: title,
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        legend: {
            right: "0",
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
    };

    return (
        <ReactEcharts
            style={{ height, width, padding }}
            option={merge({}, defaultOption, option)}
            onEvents={onEvents}
        />
    );
};

export default HorizontalChart;

import React from "react";
import { merge } from "lodash";
import ReactEcharts from "echarts-for-react";

interface Props {
    title: string;
    option?: object;
    height?: number | string;
    width?: number | string;
    padding?: number | string;
    onEvents?: any;
}

const PieChart = ({
    title,
    option = {},
    height = 500,
    width = 500,
    padding = 0,
    onEvents = {},
}: Props) => {
    const defaultOption = {
        title: {
            text: title,
            left: "center",
        },
        tooltip: {
            trigger: "item",
        },
        legend: {
            orient: "vertical",
            left: "left",
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

export default PieChart;

import React from "react";
import { merge } from "lodash";
import ReactEcharts from "echarts-for-react";

interface Props {
    title: string;
    option?: object;
    height?: number;
    width?: number | string;
    padding?: number | string;
}

const SmoothedLineChart = ({
    title,
    option = {},
    height = 500,
    width = 500,
    padding = 0,
}: Props) => {
    const defaultOption = {
        title: {
            text: title,
        },
        tooltip: {
            trigger: "axis",
            formatter: function (params: any) {
                params = params && params[0];
                var date = new Date(params.name);
                return (
                    date.getDate() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getFullYear() +
                    " : " +
                    params.value[1]
                );
            },
            axisPointer: {
                animation: false,
            },
        },
        xAxis: {
            type: "time",
            splitLine: {
                show: true,
            },
        },
        yAxis: {
            type: "value",
            boundaryGap: [0, "100%"],
            splitLine: {
                show: false,
            },
        },
        dataZoom: [
            {
                show: true,
                type: "inside",
                filterMode: "none",
                xAxisIndex: [0],
            },
            {
                show: true,
                type: "inside",
                filterMode: "none",
                yAxisIndex: [0],
            },
        ],
    };

    return (
        <ReactEcharts
            style={{ height, width, padding }}
            option={merge({}, defaultOption, option)}
        />
    );
};

export default SmoothedLineChart;

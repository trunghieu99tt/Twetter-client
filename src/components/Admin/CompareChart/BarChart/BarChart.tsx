import ReactEcharts from "echarts-for-react";
import { merge } from "lodash";

interface Props {
  title: string;
  option?: Record<string, any>;
  height?: number | string;
  width?: number | string;
  padding?: number | string;
  onEvents: any;
}

const BarChart = ({
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
    xAxis: {
      type: "category",
      axisLabel: { interval: 0, rotate: 30 },
      triggerEvent: true,
    },
    yAxis: {},
  };

  return (
    <ReactEcharts
      style={{ height, width, padding }}
      option={merge({}, defaultOption, option)}
      onEvents={onEvents}
    />
  );
};

export default BarChart;

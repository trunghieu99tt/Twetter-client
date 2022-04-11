import BaseView from "@layout/Admin/BaseView";
import React from "react";
import HorizontalChart from "../../CompareChart/HorizontalChart";

import classes from "./userStatistic.module.css";
import { useUserStatistic } from "./useUserStatistic";

const UserStatistic = () => {
  const { mostActiveUsersDataForChart, mostPopularUsersForChart, onEvents } =
    useUserStatistic();

  return (
    <div className={classes.root}>
      <div className={classes.child}>
        {mostActiveUsersDataForChart && (
          <HorizontalChart
            option={mostActiveUsersDataForChart}
            title="Người dùng hoạt động nhiều nhất"
            width={"100%"}
            onEvents={onEvents}
          />
        )}
      </div>
      <div className={classes.child}>
        {mostPopularUsersForChart && (
          <HorizontalChart
            option={mostPopularUsersForChart}
            title="Người dùng nổi tiếng nhất"
            width={"100%"}
            onEvents={onEvents}
          />
        )}
      </div>
    </div>
  );
};

export default BaseView(UserStatistic);

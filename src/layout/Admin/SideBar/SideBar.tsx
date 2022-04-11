import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

// talons

// components
import ExpansionPanel from "./ExpansionPanel";

// styles
import classes from "./sidebar.module.css";

import {
  DashboardOutlined,
  UserOutlined,
  TransactionOutlined,
  MenuOutlined,
} from "@ant-design/icons";

// types

// states
import { useWindowSize } from "@hooks/useWindowSize";
import { adminState } from "states/user.state";
import { Size } from "@type/app.types";
import Logo from "@components/Logo";

interface Props {
  classes?: Record<string, any>;
}

export type SideBarItemType = {
  icon?: any;
  name: string;
  path?: string;
  level: number;
  role: string[];
  children?: SideBarItemType[];
};

const SideBar = ({ classes: propsClasses }: Props) => {
  const [hide, setHide] = useState<boolean>(false);
  const admin = useRecoilValue(adminState);

  const navigation = [
    {
      name: "Quản lí người dùng",
      icon: <UserOutlined />,
      path: "users",
      level: 1,
      role: ["admin", "root-admin"],
    },
    {
      name: "Bài viết bị báo cáo",
      icon: <DashboardOutlined />,
      level: 1,
      role: ["admin", "root-admin"],
      path: "reported-tweets",
    },
    {
      name: "Thống kê",
      icon: <DashboardOutlined />,
      level: 1,
      role: ["admin", "root-admin"],
      children: [
        {
          name: "Người dùng",
          icon: <TransactionOutlined />,
          path: "statistic/users",
          level: 2,
          role: ["admin", "root-admin"],
        },
        {
          name: "Tweet",
          icon: <TransactionOutlined />,
          path: "statistic/tweet",
          level: 2,
          role: ["admin", "root-admin"],
        },
      ],
    },
  ];

  const renderLevels = (data: SideBarItemType[]) => {
    return data.map((item, idx) => {
      const isActive = false;

      if (admin && !item.role.includes(admin.role)) return null;

      if (item.children) {
        return (
          <ExpansionPanel
            item={item}
            key={idx}
            isActive={isActive}
            classes={{
              itemActive: classes.itemActive,
              item: classes.item,
            }}
          >
            {renderLevels(item.children)}
          </ExpansionPanel>
        );
      }
      return (
        <Link
          to={`/${item.path}`}
          style={{
            marginBottom: "1rem",
            display: "block",
          }}
        >
          <button
            key={item.name}
            name="child"
            className={cn(classes.btn, classes.itemRoot, {
              [classes.itemActive]: isActive || item.level === 1,
            })}
          >
            <div className={classes.item}>
              {item.icon}
              <span className={classes.itemName}>{item.name}</span>
            </div>
          </button>
        </Link>
      );
    });
  };

  const size: Size = useWindowSize();

  const { width } = size || {};

  if (width && width <= 1024) {
    return (
      <React.Fragment>
        <button
          className={classes.toggleBtn}
          onClick={() => setHide((value) => !value)}
        >
          {(hide && <MenuOutlined />) || "X"}
        </button>
        {!hide && (
          <div className={classes.mask} onClick={() => setHide(true)}></div>
        )}
        <div
          className={cn(classes.root, {
            [classes.hide]: hide,
          })}
        >
          <Logo />
          {renderLevels(navigation)}
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Logo />
      {renderLevels(navigation)}
    </div>
  );
};

export default SideBar;

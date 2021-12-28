import React, { useState } from "react";
import cn from "classnames";

// icons
import { ChevronDown, ChevronRight } from "react-feather";
// styles
import classes from "./expansionPanel.module.css";
import { SideBarItemType } from "../SideBar";

// types

interface Props {
    key: any;
    children: any;
    classes?: object;
    isActive: boolean;
    item: SideBarItemType;
}

const ExpansionPanel = ({
    item,
    classes: propsClasses,
    children,
    isActive,
}: Props) => {
    const [collapsed, setCollapsed] = useState<boolean>(true);

    const handleToggleCollapse = () => setCollapsed((value) => !value);

    return (
        <div className={classes.root}>
            <button
                onClick={handleToggleCollapse}
                className={cn(classes.btn, {
                    [classes.itemActive]: isActive,
                })}
            >
                <div className={classes.item}>
                    {item?.icon && (
                        <div className={classes.icon}>{item.icon}</div>
                    )}
                    <p className={classes.name}>{item?.name}</p>
                    {(collapsed && (
                        <ChevronRight className={classes.iconArrow} />
                    )) || <ChevronDown className={classes.iconArrow} />}
                </div>
            </button>

            <div
                className={classes.panel}
                style={{
                    maxHeight: collapsed ? "0px" : "1000px",
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default ExpansionPanel;

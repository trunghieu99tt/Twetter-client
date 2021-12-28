import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import classes from "./notfound.module.css";

const NotFound = () => {
    return (
        <div className={classes.root}>
            <div className={classes.main}>
                <div className={classes.headingContainer}>
                    <h1 className={classes.heading}>
                        4<span>0</span>4
                    </h1>
                </div>
                <p className={classes.description}>
                    Không tìm thấy trang yêu cầu.
                </p>
                <Link to="/">
                    <Button type="primary">Quay về trang chủ</Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;

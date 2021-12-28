import React, { useState } from "react";
import cn from "classnames";

// talons
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";

// icons
import { UserOutlined } from "@ant-design/icons";

// styles
import classes from "./userLogo.module.css";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { adminState } from "states/user.state";

// states

const UserLogo = () => {
    const [token, setToken] = useLocalStorage("admin-token", false);
    const setAdmin = useSetRecoilState(adminState);
    const [showDropdown, setShowDropdown] = useState(false);
    const history = useHistory();

    const handleLogout = () => {
        setAdmin(null);
        setToken(null);
        history.push("/login");
    };

    return (
        <div className={classes.root}>
            <button
                className={classes.icon}
                onClick={() => setShowDropdown((value) => !value)}
            >
                <UserOutlined />
            </button>

            <div
                className={cn(classes.dropdown, {
                    [classes.active]: showDropdown,
                })}
            >
                <button className={classes.btn} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserLogo;

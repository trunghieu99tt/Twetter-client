import { useUser } from "@talons/useUser";
import React from "react";

import classes from "./header.module.css";

interface Props {}

const Header = (props: Props) => {
    return (
        <header className={classes.root}>
            <div className={classes.right}></div>
        </header>
    );
};

export default Header;

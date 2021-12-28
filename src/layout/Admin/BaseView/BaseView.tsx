import React from "react";

import Footer from "../Footer";
import Header from "../Header";
import SideBar from "../SideBar";

import classes from "./baseView.module.css";

const BaseView =
    <P extends object>(WrappedComponent: React.ComponentType<P>) =>
    (props: P) => {
        return (
            <section className={classes.root}>
                <SideBar />
                <main className={classes.main}>
                    <Header />
                    <div className={classes.content}>
                        <WrappedComponent {...props} />
                    </div>
                    <Footer />
                </main>
            </section>
        );
    };

export default BaseView;

import PageMetadata from "@components/PageMetadata";
import React from "react";
import { useTranslation } from "react-i18next";

// components
import NotificationList from "@components/Notification/List/NotificationList";

// layout
import MainLayout from "@layout/Main";

// styles
import classes from "./notification.module.css";
import { Container } from "@shared/style/sharedStyle.style";

const NotificationPage = () => {
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <PageMetadata title={t("notification")} />
            <Container>
                <section className={classes.root}>
                    <NotificationList isPage={true} />
                </section>
            </Container>
        </React.Fragment>
    );
};

export default MainLayout(NotificationPage);

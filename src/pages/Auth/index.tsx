import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

// talons
import { useUser } from "@talons/useUser";

// components
import Auth from "@components/Auth";

// styles
import { Right, Wrapper, Main, Heading } from "./AuthPageStyle";
import { Helmet } from "react-helmet-async";

const AuthPage = () => {
    const { t } = useTranslation();
    const { user } = useUser();
    const history = useHistory();

    useEffect(() => {
        if (user?._id.length > 0) {
            history.push("/");
        }
    }, [user]);

    return (
        <React.Fragment>
            <Helmet>
                <title>{t("authentication")}</title>
            </Helmet>
            <Wrapper>
                <Main>
                    <Right>
                        <Heading>{t("authenticationGreeting")}</Heading>
                        <Auth />
                    </Right>
                </Main>
            </Wrapper>
        </React.Fragment>
    );
};

export default AuthPage;

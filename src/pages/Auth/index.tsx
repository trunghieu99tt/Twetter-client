import React, { useEffect } from "react";
import { useHistory } from "react-router";

// talons
import { useUser } from "@talons/useUser";

// components
import Auth from "@components/Auth";

// styles
import { Right, Wrapper, Main, Heading } from "./AuthPageStyle";
import { Helmet } from "react-helmet-async";

const AuthPage = () => {
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
                <title>Authentication</title>
            </Helmet>
            <Wrapper>
                <Main>
                    <Right>
                        <Heading>It's time to make new friends</Heading>
                        <Auth />
                    </Right>
                </Main>
            </Wrapper>
        </React.Fragment>
    );
};

export default AuthPage;

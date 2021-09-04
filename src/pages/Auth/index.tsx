import React, { useEffect } from "react";
import { useHistory } from "react-router";

// talons
import { useUser } from "@talons/useUser";

// components
import Auth from "@components/Auth";

// styles
import { Right, Wrapper, Main, Heading } from "./AuthPageStyle";

const AuthPage = () => {
    const { user } = useUser();
    const history = useHistory();

    useEffect(() => {
        if (user?._id.length > 0) {
            history.push("/");
        }
    }, [user]);

    return (
        <Wrapper>
            <Main>
                <Right>
                    <Heading>It's time to make new friends</Heading>
                    <Auth />
                </Right>
            </Main>
        </Wrapper>
    );
};

export default AuthPage;

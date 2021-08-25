import React from "react";

// components
import Auth from "@components/Auth";

// images
import AuthImage from "@images/auth.jpg";

// styles
import {
    Right,
    Wrapper,
    Left,
    AuthCoverPhoto,
    Main,
    Heading,
} from "./AuthPageStyle";

const index = () => {
    return (
        <Wrapper>
            <Main>
                <Left>
                    <AuthCoverPhoto src={AuthImage} alt="auth cover" />
                </Left>
                <Right>
                    <Heading>It's time to make new friends</Heading>
                    <Auth />
                </Right>
            </Main>
        </Wrapper>
    );
};

export default index;

import React, { useState } from "react";
import { v4 as uuid } from "uuid";

// talons

// components
import SocialLoginIcons from "@components/SocialAuthIcons";

import {
    Wrapper,
    Heading,
    SubHeading,
    RedirectButton,
    Form,
    InputGroup,
    InputLabel,
    Input,
    Selected,
} from "./AuthStyle";
import { useAuth } from "./useAuth";

const Auth = () => {
    const [screen, setScreen] = useState<"LOGIN" | "REGISTER">("LOGIN");

    const {
        handleLogout,
        handleSubmit,
        onCloseEmailForm,
        onOpenEmailForm,
        register,
        visibleEmailForm,
    } = useAuth({ isRegister: screen === "REGISTER" });

    const changeScreen = (newScreen: "LOGIN" | "REGISTER") =>
        setScreen(newScreen);

    const subHeading =
        screen === "REGISTER" ? (
            <SubHeading>
                Do you have an account?{" "}
                <RedirectButton onClick={() => changeScreen("LOGIN")}>
                    Login here
                </RedirectButton>
            </SubHeading>
        ) : (
            <SubHeading>
                Don't have an account?{" "}
                <RedirectButton onClick={() => changeScreen("REGISTER")}>
                    Register here
                </RedirectButton>
            </SubHeading>
        );

    const genderSelections = [
        {
            value: 0,
            label: "Male",
            id: uuid(),
        },
        {
            value: 1,
            label: "Female",
            id: uuid(),
        },
        {
            value: 2,
            label: "Others",
            id: uuid(),
        },
    ];

    return (
        <Wrapper>
            <Heading>{screen === "LOGIN" ? "Login" : "Register"}</Heading>
            {subHeading}
            <SocialLoginIcons />
            <Form>
                <InputGroup>
                    <InputLabel>Username</InputLabel>
                    <Input required />
                </InputGroup>
                <InputGroup>
                    <InputLabel>Password</InputLabel>
                    <Input type="password" required />
                </InputGroup>
                {screen === "REGISTER" && (
                    <React.Fragment>
                        <InputGroup>
                            <InputLabel>Confirm Password</InputLabel>
                            <Input type="password" required />
                        </InputGroup>
                        <InputGroup>
                            <InputLabel>Gender</InputLabel>
                            <Selected></Selected>
                        </InputGroup>
                    </React.Fragment>
                )}
            </Form>
        </Wrapper>
    );
};

export default Auth;

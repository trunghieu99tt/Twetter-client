import React, { useState } from "react";

// talons
import { useAuth } from "./useAuth";

// components
import GenderSelector from "./GenderSelector";
import SocialLoginIcons from "@components/Auth/SocialAuthIcons";

import {
    Wrapper,
    SubHeading,
    RedirectButton,
    Form,
    InputGroup,
    InputLabel,
    Input,
    Hr,
    SocialSuggest,
    SubmitButton,
} from "./AuthStyle";

const Auth = () => {
    const [screen, setScreen] = useState<"LOGIN" | "REGISTER">("LOGIN");

    const {
        gender,
        setGender,
        handleLogout,
        handleSubmit,
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
                    Register here now
                </RedirectButton>
            </SubHeading>
        );

    return (
        <Wrapper>
            {subHeading}
            <Form>
                <InputGroup>
                    <InputLabel>Username</InputLabel>
                    <Input required {...register("username")} name="username" />
                </InputGroup>
                <InputGroup>
                    <InputLabel>Password</InputLabel>
                    <Input type="password" required {...register("password")} />
                </InputGroup>
                {screen === "REGISTER" && (
                    <React.Fragment>
                        <InputGroup>
                            <InputLabel>Confirm Password</InputLabel>
                            <Input
                                type="password"
                                required
                                {...register("username")}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLabel>Gender</InputLabel>
                            <GenderSelector
                                gender={gender}
                                setGender={setGender}
                            />
                        </InputGroup>
                    </React.Fragment>
                )}
                <SubmitButton onClick={handleSubmit}>
                    {screen === "REGISTER" ? "Register" : "Login"}
                </SubmitButton>
            </Form>
            <Hr>
                <span>Or</span>
            </Hr>
            <SocialSuggest>Don't want to wait? Login with </SocialSuggest>
            <SocialLoginIcons />
        </Wrapper>
    );
};

export default Auth;

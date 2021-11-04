import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// talons
import { useAuth } from "./useAuth";

// components
import GenderSelector from "./GenderSelector";
import ForgotPassword from "@components/ForgotPassword";
import SocialLoginIcons from "@components/Auth/SocialAuthIcons";

import {
    Hr,
    Form,
    Input,
    Wrapper,
    SubHeading,
    InputGroup,
    InputLabel,
    SocialSuggest,
    SubmitButton,
    RedirectButton,
    ForgotPasswordStyled,
} from "./AuthStyle";
import { AnimatePresence } from "framer-motion";

const Auth = () => {
    const { t } = useTranslation();

    const [screen, setScreen] = useState<"LOGIN" | "REGISTER">("LOGIN");

    const {
        gender,
        setGender,
        handleSubmit,
        register,
        onOpenForgotPasswordForm,
        onCloseForgotPasswordForm,
        visibleForgotPasswordForm,
    } = useAuth({
        isRegister: screen === "REGISTER",
    });

    const changeScreen = (newScreen: "LOGIN" | "REGISTER") =>
        setScreen(newScreen);

    const subHeading =
        screen === "REGISTER" ? (
            <SubHeading>
                {t("doYouHaveAnAccount")}?{" "}
                <RedirectButton onClick={() => changeScreen("LOGIN")}>
                    {t("loginHere")}
                </RedirectButton>
            </SubHeading>
        ) : (
            <SubHeading>
                {t("dontHaveAnAccount")}?{" "}
                <RedirectButton onClick={() => changeScreen("REGISTER")}>
                    {t("registerHere")}
                </RedirectButton>
            </SubHeading>
        );

    return (
        <Wrapper>
            <AnimatePresence>
                {visibleForgotPasswordForm && (
                    <ForgotPassword onClose={onCloseForgotPasswordForm} />
                )}
            </AnimatePresence>
            {subHeading}
            <Form>
                <InputGroup>
                    <InputLabel>{t("username")}</InputLabel>
                    <Input required {...register("username")} name="username" />
                </InputGroup>
                <InputGroup>
                    <InputLabel>{t("password")}</InputLabel>
                    <Input type="password" required {...register("password")} />
                </InputGroup>
                {screen === "REGISTER" && (
                    <React.Fragment>
                        <InputGroup>
                            <InputLabel>{t("confirmPassword")}</InputLabel>
                            <Input
                                type="password"
                                required
                                {...register("username")}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLabel>{t("gender")}</InputLabel>
                            <GenderSelector
                                gender={gender}
                                setGender={setGender}
                            />
                        </InputGroup>
                    </React.Fragment>
                )}
                <SubmitButton onClick={handleSubmit}>
                    {screen === "REGISTER" ? t("register") : t("login")}
                </SubmitButton>
            </Form>
            <Hr>
                <span>{t("or")}</span>
            </Hr>
            <SocialSuggest> {t("socialLoginHeading")}</SocialSuggest>
            <SocialLoginIcons />
            <ForgotPasswordStyled onClick={onOpenForgotPasswordForm}>
                {t("forgotYourPassword")}
            </ForgotPasswordStyled>
        </Wrapper>
    );
};

export default Auth;

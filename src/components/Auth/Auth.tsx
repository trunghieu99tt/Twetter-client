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
import ReactDatePicker from "react-datepicker";

const Auth = () => {
    const { t } = useTranslation();

    const [screen, setScreen] = useState<"LOGIN" | "REGISTER">("LOGIN");

    const {
        gender,
        birthday,

        register,
        setGender,
        setBirthday,
        handleSubmit,
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
        <React.Fragment>
            <AnimatePresence>
                {visibleForgotPasswordForm && (
                    <ForgotPassword onClose={onCloseForgotPasswordForm} />
                )}
            </AnimatePresence>
            <Wrapper>
                {subHeading}
                <Form>
                    <InputGroup>
                        <InputLabel>{t("username")}</InputLabel>
                        <Input
                            required
                            {...register("username")}
                            name="username"
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLabel>{t("password")}</InputLabel>
                        <Input
                            type="password"
                            required
                            {...register("password")}
                        />
                    </InputGroup>
                    {screen === "REGISTER" && (
                        <React.Fragment>
                            <InputGroup>
                                <InputLabel>{t("confirmPassword")}</InputLabel>
                                <Input
                                    type="password"
                                    required
                                    {...register("passwordConfirm")}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLabel>{t("name")}</InputLabel>
                                <Input
                                    type="text"
                                    required
                                    {...register("name")}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLabel>{t("email")}</InputLabel>
                                <Input
                                    type="text"
                                    required
                                    {...register("email")}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLabel>{t("birthday")}</InputLabel>
                                <ReactDatePicker
                                    selected={birthday}
                                    onChange={(date: Date) => setBirthday(date)}
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
        </React.Fragment>
    );
};

export default Auth;

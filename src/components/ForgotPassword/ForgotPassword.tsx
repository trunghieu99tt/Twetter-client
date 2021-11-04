import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// talons
import { useForgotPassword } from "./useForgotPassword";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./forgotPassword.module.css";

interface Props {
    classes?: object;
    onClose: () => void;
}

const initState = {
    opacity: 0,
    y: "1rem",
};

const ForgotPassword = ({ classes: propsClasses, onClose }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const { t } = useTranslation();

    const { email, onSubmit, onChange } = useForgotPassword({
        onClose,
    });

    return (
        <motion.section
            className={classes.root}
            initial={initState}
            animate={{
                ...initState,
                opacity: 1,
                y: 0,
            }}
            exit={initState}
        >
            <div className={classes.mask} onClick={onClose}></div>
            <div className={classes.form}>
                <h4 className={classes.subHeading}>
                    {t("forgotPasswordHeading")}
                </h4>
                <div>
                    <input
                        className={classes.input}
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        id="forgotPasswordEmail"
                        placeholder="Enter your email here..."
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={classes.submitBtn}
                    onClick={onSubmit}
                >
                    {t("send")}
                </button>
            </div>
        </motion.section>
    );
};

export default ForgotPassword;

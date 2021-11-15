import throttle from "lodash.throttle";
import { ChangeEvent, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// constants
import { BACKGROUND_LIST } from "constants/story.constants";
import { MAX_LENGTH_STORY_TEXT } from "constants/app.constants";

// styles
import { Flex } from "@shared/style/sharedStyle.style";
import classes from "./textStory.module.css";

type Prop = {
    onCancel: () => void;
    onSubmit: (text: string) => void;
    setLoading: (loading: boolean) => void;
};

const TextStory = ({ onCancel, onSubmit, setLoading }: Prop) => {
    const { t } = useTranslation();

    const [text, setText] = useState("");
    const [background, setBackground] = useState("#000");

    const logError = useCallback(
        throttle(
            () =>
                toast.error(
                    t("textTooLongError", { maxLength: MAX_LENGTH_STORY_TEXT })
                ),
            2000
        ),
        []
    );

    const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        if (text.length > MAX_LENGTH_STORY_TEXT) {
            logError();
        } else {
            setText(text);
        }
    };

    const saveToServer = () => {
        if (text.trim().length > 0) {
            const data = {
                type: "text",
                background,
                text,
            };
            onSubmit(JSON.stringify(data));
        } else {
            toast.error(t("emptyStoryError"));
        }
    };

    return (
        <div className={classes.root}>
            <Flex gap="4rem" justify="center" align="center">
                <aside className={classes.aside}>
                    <p className={classes.label}>{t("addYourTextHere")}</p>
                    <textarea
                        className={classes.textarea}
                        onChange={onChangeText}
                        rows={7}
                    />
                    <p className={classes.label}>{t("changeColor")}</p>
                    <ul className={classes.backgroundList}>
                        {BACKGROUND_LIST.map((color: string) => {
                            return (
                                <li
                                    onClick={() => setBackground(color)}
                                    style={{
                                        background: color,
                                        cursor: "pointer",
                                        outline: `${
                                            color === background
                                                ? "2px solid blue"
                                                : ""
                                        } `,
                                    }}
                                ></li>
                            );
                        })}
                    </ul>
                </aside>
                <div className={classes.main}>
                    <p className={classes.label}>{t("preview")}</p>

                    <div
                        className={classes.textStoryPreview}
                        style={{
                            background: background,
                        }}
                    >
                        <p className={classes.text}>{text}</p>
                    </div>
                </div>
            </Flex>
            <div className={classes.btnGroup}>
                <button className={classes.saveBtn} onClick={saveToServer}>
                    {t("save")}
                </button>
                <button className={classes.cancelBtn} onClick={onCancel}>
                    {t("cancel")}
                </button>
            </div>
        </div>
    );
};

export default TextStory;

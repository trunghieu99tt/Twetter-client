import { MAX_LENGTH_STORY_TEXT } from "constants/app.constants";
import throttle from "lodash.throttle";
import { ChangeEvent, useCallback, useState } from "react";
import { toast } from "react-toastify";

// constants
import { BACKGROUND_LIST } from "constants/story.constants";

// styles
import { Flex } from "@shared/style/sharedStyle.style";
import classes from "./textStory.module.css";

type Prop = {
    onCancel: () => void;
    onSubmit: (text: string) => void;
};

const TextStory = ({ onCancel, onSubmit }: Prop) => {
    const [text, setText] = useState("");
    const [background, setBackground] = useState("#000");

    const logError = useCallback(
        throttle(
            () =>
                toast.error(
                    `Text is too long! Length of text must be less than ${MAX_LENGTH_STORY_TEXT}`
                ),
            2000
        ),
        []
    );

    const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        console.log(`text.length`, text.length);
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
            toast.error("Can't create empty text story");
        }
    };

    return (
        <div className={classes.root}>
            <Flex gap="4rem" justify="center" align="center">
                <aside className={classes.aside}>
                    <p className={classes.label}>Add your text here!</p>
                    <textarea
                        className={classes.textarea}
                        onChange={onChangeText}
                        rows={7}
                    />
                    <p className={classes.label}>Change color</p>
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
                    <p className={classes.label}>Preview</p>

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
                    Save
                </button>
                <button className={classes.cancelBtn} onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default TextStory;

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Picker from "emoji-picker-react";

// talons
import { useOnClickOutside } from "@hooks/useOnClickOutside";

// utils
import mergeClasses from "@utils/mergeClasses";

// components
import VoiceMessageForm from "../VoiceMessageForm";

// icons
import { IoMdSend } from "react-icons/io";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { BsPlus, BsFillImageFill, BsMic } from "react-icons/bs";

// styles
import defaultClasses from "./textmessageform.module.css";

interface Props {
    classes?: object;
    onSubmit: (event: any) => void;
    onChange: (event: any, isFile?: boolean) => void;
    value: string;
    chosenEmoji: any;
    setChosenEmoji: any;
}

const TextMessageForm = ({
    classes: propsClasses,
    value,
    onSubmit,
    onChange,
    setChosenEmoji,
}: Props) => {
    const [isVisibleMedia, setIsVisibleMedia] = useState<boolean>(true);
    const [showEmoji, setShowEmoji] = useState<boolean>(false);
    const [showRecord, setShowRecord] = useState<boolean>(false);

    const emojiDiv = useRef() as React.MutableRefObject<HTMLDivElement>;

    const toggleMediaGroup = () => setIsVisibleMedia((value) => !value);
    const toggleShowEmoji = () => setShowEmoji((value) => !value);
    const toggleShowRecord = () => setShowRecord((value) => !value);

    useOnClickOutside(emojiDiv, () => setShowEmoji(false));

    const onEmojiClick = (event: any, emojiObject: any) => {
        setChosenEmoji(emojiObject);
    };

    const classes = mergeClasses(defaultClasses, propsClasses);

    return (
        <form onSubmit={onSubmit} className={classes.root}>
            <AnimatePresence>
                {isVisibleMedia && (
                    <motion.div
                        className={classes.mediaGroup}
                        initial={{ y: 0, opacity: 0, zIndex: -1 }}
                        animate={{ y: "-110%", opacity: 1, zIndex: 0 }}
                        exit={{ y: 0, opacity: 0, zIndex: -1 }}
                    >
                        <div className={classes.mediaItem}>
                            <input
                                id="messageImage"
                                type="file"
                                style={{ display: "none" }}
                                name="image"
                                onChange={(event) => onChange(event, true)}
                            />
                            <label htmlFor="messageImage">
                                <BsFillImageFill />
                            </label>
                        </div>

                        <div className={classes.mediaItem} ref={emojiDiv}>
                            {showEmoji && (
                                <Picker
                                    onEmojiClick={onEmojiClick}
                                    pickerStyle={{
                                        position: "absolute",
                                        bottom: "0",
                                        transform: "translateY(-15%)",
                                        boxShadow: "none    ",
                                    }}
                                />
                            )}
                            <button type="button" onClick={toggleShowEmoji}>
                                <HiOutlineEmojiHappy />
                            </button>
                        </div>

                        <div className={classes.mediaItem}>
                            {showRecord && (
                                <VoiceMessageForm closeRecord={setShowRecord} />
                            )}
                            <button type="button" onClick={toggleShowRecord}>
                                <BsMic />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="w-6 h-6 flex items-center justify-center bg-m">
                <button
                    type="button"
                    className={classes.mediaGroupToggleBtn}
                    onClick={toggleMediaGroup}
                >
                    <BsPlus />
                </button>
            </div>
            <input
                type="text"
                name="message"
                placeholder="Message"
                className={classes.textInput}
                value={value}
                required
                onChange={onChange}
            />
            <button className={classes.submitBtn} onClick={onSubmit}>
                <IoMdSend />
            </button>
        </form>
    );
};

export default TextMessageForm;

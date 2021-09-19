import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Picker from "emoji-picker-react";
import { EditorState } from "draft-js";

// talons
import { useOnClickOutside } from "@hooks/useOnClickOutside";

// components
// import VoiceMessageForm from "../VoiceMessageForm";
import RichTextInput from "@components/RichTextInput";

// icons
import { IoMdSend } from "react-icons/io";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { BsPlus, BsFillImageFill, BsMic } from "react-icons/bs";

// styles
import {
    MediaItem,
    Root,
    SubmitButton,
    TextInputWrapper,
    ToggleMediaGroupButton,
} from "./TextMessageFormStyle";
import classes from "./textmessageform.module.css";

interface Props {
    onSubmit: (event: any) => void;
    onChange: (event: any, isFile?: boolean) => void;
    value: EditorState;
    setChosenEmoji: any;
    setMessage: any;
}

const TextMessageForm = ({
    value,
    onSubmit,
    onChange,
    setChosenEmoji,
    setMessage,
}: Props) => {
    const [showEmoji, setShowEmoji] = useState<boolean>(false);
    // const [showRecord, setShowRecord] = useState<boolean>(false);
    const [isVisibleMedia, setIsVisibleMedia] = useState<boolean>(true);

    const emojiDiv = useRef() as React.MutableRefObject<HTMLDivElement>;

    const toggleMediaGroup = () => setIsVisibleMedia((value) => !value);
    const toggleShowEmoji = () => setShowEmoji((value) => !value);
    // const toggleShowRecord = () => setShowRecord((value) => !value);

    useOnClickOutside(emojiDiv, () => setShowEmoji(false));

    const onEmojiClick = (event: any, emojiObject: any) => {
        setChosenEmoji(emojiObject);
    };

    return (
        <Root onSubmit={onSubmit} className={classes.root}>
            {/* <AnimatePresence>
                {isVisibleMedia && (
                    <motion.div
                        className={classes.mediaGroup}
                        initial={{ y: 0, opacity: 0, zIndex: -1 }}
                        animate={{ y: "-100%", opacity: 1, zIndex: 1 }}
                        exit={{ y: 0, opacity: 0, zIndex: -1 }}
                    >
                        <MediaItem>
                            <input
                                id="messageImage"
                                type="file"
                                name="image"
                                onChange={(event) => onChange(event, true)}
                                style={{ display: "none" }}
                            />
                            <label htmlFor="messageImage">
                                <BsFillImageFill />
                            </label>
                        </MediaItem>

                        <MediaItem ref={emojiDiv}>
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
                        </MediaItem> */}

            {/* <MediaItem>
                            {showRecord && (
                                <VoiceMessageForm closeRecord={setShowRecord} />
                            )}
                            <button type="button" onClick={toggleShowRecord}>
                                <BsMic />
                            </button>
                        </MediaItem> */}
            {/* </motion.div>
                )}
            </AnimatePresence> */}

            {/* <ToggleMediaGroupButton onClick={toggleMediaGroup}>
                <BsPlus />
            </ToggleMediaGroupButton> */}
            <TextInputWrapper>
                <RichTextInput data={value} onChange={setMessage} />
            </TextInputWrapper>
            {/* <TextInput
                type="text"
                name="message"
                value={value}
                onChange={onChange}
                required
            /> */}
            <SubmitButton onClick={onSubmit}>
                <IoMdSend />
            </SubmitButton>
        </Root>
    );
};

export default TextMessageForm;

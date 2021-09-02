import { EditorState } from "draft-js";
import { useState, useMemo } from "react";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import styled from "styled-components";

// components
import Editor from "@draft-js-plugins/editor";
import { LinkPreview } from "@dhaiwat10/react-link-preview";

// styles
import "@draft-js-plugins/linkify/lib/plugin.css";
import styles from "./custom.module.css";

const TextWrapper = styled.div`
    width: 100%;
    word-break: break-all;
    font-size: 1.4rem;
    overflow: auto;
    padding-right: 1rem;

    &::-webkit-scrollbar {
        width: 0.7rem;
    }

    &::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: #333;
        border-radius: 10px;
    }
`;

const RichTextInput = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [link, setLink] = useState<string>("");

    const linkifyPlugin = useMemo(
        () =>
            createLinkifyPlugin({
                component(props) {
                    console.log("props: ", props);
                    if (!link) {
                        setLink(props.href);
                    }
                    return <a {...props}>{props.children}</a>;
                },
            }),
        [link]
    );

    return (
        <TextWrapper>
            <Editor
                editorState={editorState}
                onChange={setEditorState}
                placeholder="What's on your mind..."
                plugins={[linkifyPlugin]}
            ></Editor>

            {link && (
                <LinkPreview url={link} className={styles.customLinkPreview} />
            )}
            <button
                onClick={() => console.log(editorState.getCurrentContent())}
            >
                Log State
            </button>
        </TextWrapper>
    );
};

export default RichTextInput;

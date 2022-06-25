import createEmojiPlugin from "@draft-js-plugins/emoji";
import { EditorState } from "draft-js";
import { useState } from "react";

import styled from "styled-components";

// components
import Editor from "@draft-js-plugins/editor";
// import { LinkPreview } from "@dhaiwat10/react-link-preview";

// styles
import "@draft-js-plugins/emoji/lib/plugin.css";
import "@draft-js-plugins/linkify/lib/plugin.css";

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

type Props = {
  data: EditorState;
  onChange?: any;
  placeholder?: string;
};

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const RichTextInput = ({ data, onChange, placeholder }: Props) => {
  const [link, setLink] = useState<string>("");

  const isReadOnly = onChange === undefined;

  // const linkifyPlugin = useMemo(
  //     () =>
  //         createLinkifyPlugin({
  //             component(props) {
  //                 console.log("props: ", props);
  //                 if (!link) {
  //                     setLink(props.href);
  //                 }
  //                 return <a {...props}>{props.children}</a>;
  //             },
  //         }),
  //     [link]
  // );

  // const onChangeTextEditor = (editorState: EditorState) => {
  //     console.log(`editorState`, editorState.getCurrentContent());
  //     if (onChange) {
  //         onChange(editorState);
  //     }
  // };

  return (
    <TextWrapper>
      <Editor
        readOnly={isReadOnly}
        editorState={data}
        onChange={onChange}
        placeholder={placeholder}
        // plugins={[emojiPlugin]}
      ></Editor>
      {/* {!isReadOnly && (
                <React.Fragment>
                    <EmojiSuggestions />
                    <EmojiSelect />
                </React.Fragment>
            )} */}

      {/* {link && (
                <LinkPreview url={link} className={styles.customLinkPreview} />
            )}
            <button onClick={saveRaw}>Save raw</button> */}
    </TextWrapper>
  );
};

export default RichTextInput;

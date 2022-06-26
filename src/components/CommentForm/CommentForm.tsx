import { Spinner2 } from "@components/Loaders";
import MediaViewer from "@components/MediaViewer";
import UserAvatarSmall from "@components/UserAvatarSmall";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import { iComment } from "@type/comments.types";
import { iTweet } from "@type/tweet.types";
import EmojiPicker from "emoji-picker-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsCardImage } from "react-icons/bs";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { ImCancelCircle } from "react-icons/im";

import {
  CommentImageCancelButton,
  CommentImageWrapper,
  CommentMedia,
  EmojiDivStyled,
  FileInput,
  FileInputLabel,
  Input,
  InputLoading,
  InputWrapper,
  Wrapper,
} from "./CommentFormStyle";
import { useAddComment } from "./useCommentForm";

type Props = {
  tweet: iTweet;
  commentData?: iComment;
  addCommentRef: React.RefObject<HTMLInputElement>;
};

const CommentForm = ({
  addCommentRef,
  tweet,
  commentData,
}: Props): JSX.Element => {
  const {
    user,
    media,
    comment,
    loading,
    showEmoji,

    onSubmit,
    hideEmoji,
    onChangeFile,
    onEmojiClick,
    onCancelMedia,
    onChangeComment,
    toggleShowEmoji,
  } = useAddComment({
    tweet,
    commentData,
  });

  const emojiRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(emojiRef, hideEmoji);

  const { t } = useTranslation();

  const shouldIndent = !!commentData;
  const fileInputId = `comment-file-${commentData?._id || tweet?._id}`;

  return (
    <React.Fragment>
      <Wrapper onSubmit={onSubmit} shouldIndent={shouldIndent}>
        <UserAvatarSmall user={user} />
        <InputWrapper>
          
          <Input
            value={comment}
            ref={addCommentRef}
            onChange={onChangeComment}
            placeholder={`${t("addAComment")} ...`}
            disabled={loading}
          />
          {loading && (
            <InputLoading>
              <Spinner2 customStyles="--size: 20px" />
            </InputLoading>
          )}
          <EmojiDivStyled ref={emojiRef}>
            {showEmoji && (
              <EmojiPicker
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
          </EmojiDivStyled>
          <FileInputLabel htmlFor={fileInputId}>
            <BsCardImage />
          </FileInputLabel>
          <FileInput
            type="file"
            id={fileInputId}
            name="comment-file"
            onChange={onChangeFile}
          />
        </InputWrapper>
      </Wrapper>
      {media?.url && (
        <CommentImageWrapper>
          <CommentImageCancelButton onClick={onCancelMedia}>
            <ImCancelCircle />
          </CommentImageCancelButton>
          <CommentMedia>
            <MediaViewer media={media} />
          </CommentMedia>
        </CommentImageWrapper>
      )}
    </React.Fragment>
  );
};

export default CommentForm;

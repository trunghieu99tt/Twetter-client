import React from "react";
import { useTranslation } from "react-i18next";

// talons
import { useAddComment } from "./useAddComment";

// components
import { Spinner2 } from "@components/Loaders";
import UserAvatarSmall from "@components/UserAvatarSmall";

// icons
import { BsCardImage } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";

// styles
import {
    Input,
    Wrapper,
    FileInput,
    CommentMedia,
    InputLoading,
    InputWrapper,
    FileInputLabel,
    CommentImageWrapper,
    CommentImageCancelButton,
} from "./AddCommentStyle";
import MediaViewer from "@components/MediaViewer";
import { iTweet } from "@type/tweet.types";
import { iComment } from "@type/comments.types";

type Props = {
    tweet: iTweet;
    commentData?: iComment;
    addCommentRef: React.RefObject<HTMLInputElement>;
};

const AddComment = ({ addCommentRef, tweet, commentData }: Props) => {
    const {
        user,
        media,
        comment,
        loading,

        onSubmit,
        onChangeFile,
        onCancelMedia,
        onChangeComment,
    } = useAddComment({
        tweet,
        commentData,
    });

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

export default AddComment;

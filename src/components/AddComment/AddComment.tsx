import React from "react";

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

type Props = {
    tweetId: string;
    addCommentRef: React.RefObject<HTMLInputElement>;
};

const AddComment = ({ addCommentRef, tweetId }: Props) => {
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
        tweetId,
    });

    return (
        <React.Fragment>
            <Wrapper onSubmit={onSubmit}>
                <UserAvatarSmall user={user} />
                <InputWrapper>
                    <Input
                        value={comment}
                        ref={addCommentRef}
                        onChange={onChangeComment}
                        placeholder="Add a comment..."
                        disabled={loading}
                    />
                    {loading && (
                        <InputLoading>
                            <Spinner2 customStyles="--size: 20px" />
                        </InputLoading>
                    )}
                    <FileInputLabel htmlFor={`comment-file-${tweetId}`}>
                        <BsCardImage />
                    </FileInputLabel>
                    <FileInput
                        type="file"
                        name="comment-file"
                        id={`comment-file-${tweetId}`}
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

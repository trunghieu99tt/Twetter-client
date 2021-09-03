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
    CommentImage,
    InputLoading,
    InputWrapper,
    FileInputLabel,
    CommentImageWrapper,
    CommentImageCancelButton,
} from "./AddCommentStyle";

type Props = {
    tweetId: string;
    addCommentRef: React.RefObject<HTMLInputElement>;
};

const AddComment = ({ addCommentRef, tweetId }: Props) => {
    const {
        user,
        comment,
        loading,
        imagePreview,

        onSubmit,
        onChangeFile,
        onCancelImage,
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
            {imagePreview && (
                <CommentImageWrapper>
                    <CommentImageCancelButton onClick={onCancelImage}>
                        <ImCancelCircle />
                    </CommentImageCancelButton>
                    <CommentImage src={imagePreview} alt="comment image" />
                </CommentImageWrapper>
            )}
        </React.Fragment>
    );
};

export default AddComment;

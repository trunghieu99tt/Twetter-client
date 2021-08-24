import React, { ChangeEvent, useState } from "react";

// icons
import { BsCardImage } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";

// data
import { user } from "../../mocks/user.data";

// styles
import {
    CommentImage,
    CommentImageCancelButton,
    CommentImageWrapper,
    FileInput,
    FileInputLabel,
    Input,
    InputWrapper,
    UserAvatar,
    Wrapper,
} from "./AddCommentStyle";

type Props = {
    addCommentRef: React.RefObject<HTMLInputElement>;
};

const AddComment = ({ addCommentRef }: Props) => {
    const [comment, setComment] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const onChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const onCancelImage = () => {
        setFile(null);
        setImagePreview("");
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        console.log(comment);
    };

    return (
        <React.Fragment>
            <Wrapper onSubmit={onSubmit}>
                <UserAvatar
                    src={user?.avatar}
                    alt={user?.name || "user avatar"}
                />
                <InputWrapper>
                    <Input
                        placeholder="Add a comment..."
                        onChange={onChangeComment}
                        ref={addCommentRef}
                    />
                    <FileInputLabel htmlFor="comment-file">
                        <BsCardImage />
                    </FileInputLabel>
                    <FileInput
                        type="file"
                        name="comment-file"
                        id="comment-file"
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

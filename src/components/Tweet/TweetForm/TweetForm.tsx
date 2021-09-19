import React from "react";

// talons
import { useUser } from "@talons/useUser";
import { useTweetForm } from "../useTweetForm";

// components
import { Spinner1 } from "@components/Loaders";
import UserAvatarSmall from "@components/UserAvatarSmall";
// import RichTextInput from "@components/RichTextInput";
import AudienceSelector from "@components/AudienceSelector";

// icons
import { BsCardImage } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";

// types
import { iTweet } from "@type/tweet.types";

// styles
import {
    Main,
    Footer,
    Wrapper,
    HeadLine,
    FileLabel,
    FileInput,
    TweetImage,
    TweetContentInput,
    TweetSubmitButton,
    TweetImageWrapper,
    DeleteImagesButton,
    ImageLeftPlaceHolder,
    TweetContentInputWrapper,
} from "./TweetFormStyle";
import { Flex } from "@shared/style/sharedStyle.style";
import RichTextInput from "@components/RichTextInput";

type modeType = "block" | "flex" | "grid" | "none";

interface Props {
    tweet?: iTweet;
    onCancel?: () => void;
}

const TweetForm = ({ tweet, onCancel }: Props) => {
    const {
        loading,
        content,
        audience,
        imagesPreview,

        onSubmit,
        setContent,
        setAudience,
        onChangeFile,
        onCancelImage,
    } = useTweetForm({
        tweet,
    });

    const { user } = useUser();

    let imageViewMode: modeType = "none";
    const imagesLen = imagesPreview?.length;

    if (imagesLen > 2) {
        imageViewMode = "grid";
    } else if (imagesLen > 1) {
        imageViewMode = "flex";
    } else if (imagesLen > 0) {
        imageViewMode = "block";
    }

    const remainingImageCount = Math.max(0, imagesLen - 5);

    const inputFileId = tweet
        ? `update-tweet-media-${tweet._id}`
        : `new-tweet-media`;

    return (
        <React.Fragment>
            {loading && <Spinner1 />}
            <Wrapper>
                {!tweet && <HeadLine>Tweet something...</HeadLine>}
                <Main>
                    <UserAvatarSmall user={user} />
                    <div>
                        <TweetContentInputWrapper>
                            {/* <TweetContentInput
                                value={content}
                                name="tweet-content"
                                onChange={onChangeContent}
                                placeholder="What's on your mind?"
                            /> */}
                            {/* // TODO: Update later */}
                            <RichTextInput
                                data={content}
                                onChange={setContent}
                                placeholder="What's on your mind?"
                            />
                        </TweetContentInputWrapper>
                        <TweetImageWrapper mode={imageViewMode}>
                            <DeleteImagesButton onClick={onCancelImage}>
                                <ImCancelCircle />
                            </DeleteImagesButton>
                            {imagesPreview?.length > 0 &&
                                imagesPreview
                                    .slice(0, Math.min(5, imagesLen))
                                    .map((image, index) => (
                                        <TweetImage
                                            key={`add-tweet-file-image-${index}`}
                                            src={image}
                                            alt={`add-tweet-file-image-${index}`}
                                        />
                                    ))}
                            {(remainingImageCount &&
                                remainingImageCount > 0 && (
                                    <ImageLeftPlaceHolder>
                                        {remainingImageCount}+
                                    </ImageLeftPlaceHolder>
                                )) ||
                                null}
                        </TweetImageWrapper>
                        <Footer>
                            <Flex gap="1.5rem">
                                <FileLabel htmlFor={inputFileId}>
                                    <BsCardImage />
                                </FileLabel>
                                <FileInput
                                    type="file"
                                    id={inputFileId}
                                    onChange={onChangeFile}
                                    multiple
                                />
                                <AudienceSelector
                                    audience={audience}
                                    setAudience={setAudience}
                                />
                            </Flex>
                            <TweetSubmitButton
                                onClick={() => {
                                    onSubmit();
                                    if (onCancel) {
                                        onCancel();
                                    }
                                }}
                                disabled={loading}
                            >
                                {!tweet ? "Tweet" : "Update"}
                            </TweetSubmitButton>
                        </Footer>
                    </div>
                </Main>
            </Wrapper>
        </React.Fragment>
    );
};

export default TweetForm;

import React from "react";

// talons
import { useAddTweet } from "./useAddTweet";

// components
import { Spinner1 } from "@components/Loaders";
// import RichTextInput from "@components/RichTextInput";
import AudienceSelector from "@components/AudienceSelector";

// icons
import { BsCardImage } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";

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
} from "./AddTweetStyle";
import { Flex } from "@shared/style/sharedStyle.style";
import { useQueryClient } from "react-query";
import { USER_QUERY } from "constants/user.constants";
import UserAvatarSmall from "@components/UserAvatarSmall";
import { useUser } from "@talons/useUser";

type modeType = "block" | "flex" | "grid" | "none";

const AddTweet = () => {
    const {
        loading,
        content,
        audience,
        imagesPreview,

        onSubmit,
        setAudience,
        onChangeFile,
        onCancelImage,
        onChangeContent,
    } = useAddTweet();

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

    const imageLeft = Math.max(0, imagesLen - 5);

    return (
        <React.Fragment>
            {loading && <Spinner1 />}
            <Wrapper>
                <HeadLine>Tweet something</HeadLine>
                <Main>
                    <UserAvatarSmall user={user} />
                    <div>
                        <TweetContentInputWrapper>
                            <TweetContentInput
                                value={content}
                                name="tweet-content"
                                onChange={onChangeContent}
                                placeholder="What's on your mind?"
                            />
                            {/* // TODO: Update later */}
                            {/* <RichTextInput /> */}
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
                            {imageLeft && imageLeft > 0 && (
                                <ImageLeftPlaceHolder>
                                    {imageLeft}+
                                </ImageLeftPlaceHolder>
                            )}
                        </TweetImageWrapper>
                        <Footer>
                            <Flex gap="1.5rem">
                                <FileLabel htmlFor="tweet-file">
                                    <BsCardImage />
                                </FileLabel>
                                <FileInput
                                    type="file"
                                    id="tweet-file"
                                    onChange={onChangeFile}
                                    multiple
                                />
                                <AudienceSelector
                                    audience={audience}
                                    setAudience={setAudience}
                                />
                            </Flex>
                            <TweetSubmitButton
                                onClick={onSubmit}
                                disabled={loading}
                            >
                                Tweet
                            </TweetSubmitButton>
                        </Footer>
                    </div>
                </Main>
            </Wrapper>
        </React.Fragment>
    );
};

export default AddTweet;

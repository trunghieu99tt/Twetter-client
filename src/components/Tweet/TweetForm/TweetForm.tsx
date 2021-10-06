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
    MediaItem,
    TweetSubmitButton,
    TweetImageWrapper,
    DeleteImagesButton,
    ImageLeftPlaceHolder,
    TweetContentInputWrapper,
} from "./TweetFormStyle";
import { Flex } from "@shared/style/sharedStyle.style";
import RichTextInput from "@components/RichTextInput";
import { TMedia } from "@type/app.types";
import MediaViewer from "@components/MediaViewer";

type modeType = "block" | "flex" | "grid" | "none";

interface Props {
    tweet?: iTweet;
    onCancel?: () => void;
}

const TweetForm = ({ tweet, onCancel }: Props) => {
    const {
        media,
        loading,
        content,
        audience,

        onSubmit,
        setContent,
        setAudience,
        onChangeFile,
        onCancelImage,
    } = useTweetForm({
        tweet,
    });

    const { user } = useUser();

    let mediaViewMode: modeType = "none";
    const mediaLen = media?.length;

    if (mediaLen > 2) {
        mediaViewMode = "grid";
    } else if (mediaLen > 1) {
        mediaViewMode = "flex";
    } else if (mediaLen > 0) {
        mediaViewMode = "block";
    }

    const remainingImageCount = Math.max(0, mediaLen - 5);

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
                        <TweetImageWrapper mode={mediaViewMode}>
                            <DeleteImagesButton onClick={onCancelImage}>
                                <ImCancelCircle />
                            </DeleteImagesButton>
                            {media?.length > 0 &&
                                media
                                    .slice(0, Math.min(5, mediaLen))
                                    .map((media: TMedia, index) => (
                                        <MediaItem
                                            key={`tweet-form-media-${media.id}`}
                                        >
                                            <MediaViewer media={media} />
                                        </MediaItem>
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

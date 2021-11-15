import React from "react";
import { useTranslation } from "react-i18next";

// talons
import { useUser } from "@talons/useUser";
import { useTweetForm } from "../useTweetForm";

// components
import { Spinner1 } from "@components/Loaders";
import MediaViewer from "@components/MediaViewer";
import RichTextEditor from "@components/RichTextEditor";
import UserAvatarSmall from "@components/UserAvatarSmall";
import AudienceSelector from "@components/AudienceSelector";

// icons
import { BsCardImage } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";

// types
import { TMedia } from "@type/app.types";
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

type modeType = "block" | "flex" | "grid" | "none";

interface Props {
    tweet?: iTweet;
    onCancel?: () => void;
}

const TweetForm = ({ tweet, onCancel }: Props) => {
    const { t } = useTranslation();

    const {
        body,
        media,
        loading,
        audience,

        setBody,
        onSubmit,
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
                {!tweet && <HeadLine>{t("whatOnYourMind")}</HeadLine>}
                <Main>
                    <UserAvatarSmall user={user} />
                    <div>
                        <TweetContentInputWrapper>
                            <RichTextEditor
                                isEdit={!!tweet}
                                value={body}
                                onChangeValue={setBody}
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
                                {!tweet ? t("tweet") : t("update")}
                            </TweetSubmitButton>
                        </Footer>
                    </div>
                </Main>
            </Wrapper>
        </React.Fragment>
    );
};

export default TweetForm;

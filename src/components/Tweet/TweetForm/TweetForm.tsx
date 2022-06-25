import AudienceSelector from "@components/AudienceSelector";
import { Spinner1 } from "@components/Loaders";
import MediaViewer from "@components/MediaViewer";
import RichTextEditor from "@components/RichTextEditor";
import Button from "@components/shared/Button";
import UserAvatarSmall from "@components/UserAvatarSmall";
import { Flex } from "@shared/style/sharedStyle.style";
import { useUser } from "@talons/useUser";
import { TMedia } from "@type/app.types";
import { iTweet } from "@type/tweet.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsCardImage } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { v4 } from "uuid";
import { useTweetForm } from "../useTweetForm";
import {
  DeleteImagesButton,
  FileInput,
  FileLabel,
  Footer,
  HeadLine,
  ImageLeftPlaceHolder,
  Main,
  MediaItem,
  TweetContentInputWrapper,
  TweetImageWrapper,
  Wrapper,
} from "./TweetFormStyle";

type TMode = "block" | "flex" | "grid" | "none";

interface Props {
  tweet?: iTweet;
  onCancel?: () => void;
}

const TweetForm = ({ tweet, onCancel }: Props): JSX.Element => {
  const { t } = useTranslation();

  const {
    body,
    media,
    loading,
    audience,
    initialMedias,

    setBody,
    onSubmit,
    setAudience,
    onChangeFile,
    onCancelImage,
  } = useTweetForm({
    tweet,
  });

  const { user } = useUser();

  let mediaViewMode: TMode = "none";
  const mediaLen = media?.length + initialMedias.length;

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
      <Wrapper isEdit={!!tweet}>
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
                media.slice(0, Math.min(5, mediaLen)).map((media: TMedia) => (
                  <MediaItem key={`tweet-form-media-${media.id}`}>
                    <MediaViewer media={media} />
                  </MediaItem>
                ))}
              {media?.length < 5 &&
                initialMedias?.length > 0 &&
                initialMedias.map((url: string, idx) => {
                  const media = {
                    id: v4(),
                    url,
                    type: url?.includes("video") ? "video" : "image",
                  };
                  return (
                    <MediaItem key={`tweet-form-media-placeholder-${idx}`}>
                      <MediaViewer media={media} />
                    </MediaItem>
                  );
                })}
              {(remainingImageCount && remainingImageCount > 0 && (
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
              <Button
                onClick={() => {
                  onSubmit();
                  if (onCancel) {
                    onCancel();
                  }
                }}
                disabled={loading}
              >
                {!tweet ? t("tweet") : t("update")}
              </Button>
            </Footer>
          </div>
        </Main>
      </Wrapper>
    </React.Fragment>
  );
};

export default TweetForm;

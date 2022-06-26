import AddComment from "@components/CommentForm";
import MediaViewer from "@components/MediaViewer";
import UserAvatarSmall from "@components/UserAvatarSmall";
import { Flex } from "@shared/style/sharedStyle.style";
import { useComment } from "@talons/useComment";
import { useNotify } from "@talons/useNotify";
import { useUser } from "@talons/useUser";
import { iComment } from "@type/comments.types";
import { iNotificationDTO } from "@type/notify.types";
import { calcDiffTimeString } from "@utils/helper";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineHeart } from "react-icons/ai";

import {
  AuthorName,
  CommentMedia,
  Content,
  CreatedAt,
  Interaction,
  LikeButton,
  LikeCounter,
  Main,
  MainInfo,
  RepliesWrapper,
  ReplyButton,
  Wrapper,
} from "./CommentStyle";

interface Props {
  data: iComment;
  level?: number;
}

const Comment = ({ data, level = 0 }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { user: currentUser } = useUser();
  const { reactCommentMutation } = useComment({
    tweetId: data.tweet._id,
    userId: "",
  });
  const { createNotificationAction } = useNotify();

  const likeCount = data?.likes?.length || 0;

  const [shouldShowReplyForm, setShouldShowReplyForm] = useState(false);

  const addCommentRef = useRef(null) as React.RefObject<HTMLInputElement>;

  const onFocusCommentForm = () => {
    if (addCommentRef?.current) {
      setShouldShowReplyForm((v) => !v);
      addCommentRef.current.focus();
    }
  };

  const toggleLike = async () => {
    const response = await reactCommentMutation.mutateAsync(data._id);

    // create a notification if the user reacted

    const likes = response?.data?.likes || [];

    if (
      likes.length > 0 &&
      likes.includes(currentUser?._id) &&
      data.author._id !== currentUser?._id
    ) {
      // push notification
      const msg: iNotificationDTO = {
        text: "likedYourComment",
        receivers: [data.author._id],
        url: `/tweet/${data?.tweet?._id || data?.tweet}`,
        type: "likedComment",
      };

      createNotificationAction(msg);
    }
  };

  const didUserLike = data?.likes?.some((userId) => userId === currentUser._id);

  return (
    <Wrapper>
      <Flex>
        <UserAvatarSmall user={data?.author} />
        <Main>
          <MainInfo>
            <div>
              <AuthorName to={`/profile/${data?.author?._id}`}>
                {data?.author?.name}
              </AuthorName>
              <CreatedAt>
                {calcDiffTimeString(new Date(data?.createdAt))}
              </CreatedAt>
            </div>
            <Content>{data?.content}</Content>
            {data?.media && (
              <CommentMedia>
                <MediaViewer
                  media={{
                    url: data.media,
                    type: data.media.includes("image") ? "image" : "video",
                  }}
                />
              </CommentMedia>
            )}
          </MainInfo>
          <Flex gap="1rem">
            <Interaction>
              <LikeButton onClick={toggleLike} liked={didUserLike}>
                <AiOutlineHeart />
                {didUserLike ? t("liked") : t("like")}
              </LikeButton>
              {likeCount > 0 && (
                <LikeCounter>
                  {likeCount}{" "}
                  {likeCount === 1 ? ` ${t("like")}` : ` ${t("like")}`}
                </LikeCounter>
              )}
            </Interaction>
            {!data?.isChild && (
              <ReplyButton onClick={onFocusCommentForm}>
                {t("reply")}
              </ReplyButton>
            )}
          </Flex>
          <RepliesWrapper>
            {data?.replies?.map((reply: any) => {
              return (
                <Comment
                  data={reply}
                  level={level + 1}
                  key={`comment-reply-data-${reply._id}`}
                />
              );
            })}
          </RepliesWrapper>
        </Main>
      </Flex>

      <div
        style={{
          display: shouldShowReplyForm ? "block" : "none",
        }}
      >
        <AddComment
          tweet={data.tweet}
          commentData={data}
          addCommentRef={addCommentRef}
        />
      </div>
    </Wrapper>
  );
};

export default Comment;

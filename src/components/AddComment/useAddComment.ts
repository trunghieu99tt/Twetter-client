import { useComment } from "@talons/useComment";
import { useNotify } from "@talons/useNotify";
import { useUpload } from "@talons/useUpload";
import { useUser } from "@talons/useUser";
import { TMedia } from "@type/app.types";
import { iComment } from "@type/comments.types";
import { iNotificationDTO } from "@type/notify.types";
import { iTweet } from "@type/tweet.types";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { v4 } from "uuid";

type Props = {
  tweet: iTweet;
  commentData?: iComment;
};

export const useAddComment = ({ commentData, tweet }: Props) => {
  const [comment, setComment] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [media, setMedia] = useState<TMedia | null>(null);

  const { createNotificationAction } = useNotify();
  const { user } = useUser();
  const { uploadMedia } = useUpload();

  const { createCommentMutation } = useComment({
    userId: user?._id,
    tweetId: tweet._id,
  });

  const onChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newMedia: TMedia = {
        id: v4(),
        file,
        url: URL.createObjectURL(file),
        type: file.type.split("/")[0],
      };
      setMedia(newMedia);
    }
  };

  const onCancelMedia = () => setMedia(null);

  const resetFields = () => {
    onCancelMedia();
    setComment("");
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    let url = "";
    if (media?.file) {
      url = await uploadMedia(media?.file);
      if (!url) {
        return;
      }
    }
    const newComment = {
      content: comment,
      media: url,
    };
    const response = await createCommentMutation.mutateAsync(
      {
        newComment,
        parentId: commentData?._id || tweet?._id,
      },
      {
        onSettled: () => {
          resetFields();
        },
      }
    );

    const commentResponse = response?.data;

    if (commentResponse) {
      // push notification
      const msg: iNotificationDTO = {
        text: commentData?._id ? "repliedYourComment" : "commentedYourTweet",
        receivers: [
          commentData?._id ? commentData.author._id : tweet.author._id,
        ],
        url: `/tweet/${tweet._id}`,
        type: "comment",
      };

      createNotificationAction(msg);
    }
  };

  const toggleShowEmoji = () => setShowEmoji(!showEmoji);

  const hideEmoji = () => setShowEmoji(false);

  const onEmojiClick = (event: any, emojiObject: any) => {
    setComment(`${comment}${emojiObject.emoji}`);
  };

  return {
    user,
    media,
    comment,
    showEmoji,
    error: createCommentMutation.error,
    loading: createCommentMutation.isLoading,

    hideEmoji,
    onSubmit,
    onEmojiClick,
    onChangeFile,
    onCancelMedia,
    onChangeComment,
    toggleShowEmoji,
  };
};

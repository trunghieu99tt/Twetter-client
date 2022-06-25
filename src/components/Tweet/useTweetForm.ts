import { useHashtag } from "@talons/useHashtag";
import { useTweetQuery } from "@talons/useTweetQuery";
import { useUpload } from "@talons/useUpload";
import { TMedia } from "@type/app.types";
import { iCreateTweetDTO, iTweet } from "@type/tweet.types";
import { iUser } from "@type/user.types";
import { extractMetadata } from "@utils/helper";
import { USER_QUERY } from "constants/user.constants";
import { UserModel } from "model/user.model";
import { ChangeEvent, useState } from "react";
import { useQueryClient } from "react-query";
import { v4 as uuid } from "uuid";

type Props = {
  tweet?: iTweet;
};

export const useTweetForm = ({ tweet }: Props) => {
  const user: iUser = new UserModel(
    useQueryClient().getQueryData(USER_QUERY.GET_ME)
  ).getData();

  const [body, setBody] = useState(tweet?.content || "");
  const [media, setMedia] = useState<TMedia[]>([]);
  const [initialMedias, setInitialMedias] = useState<string[]>(
    tweet?.media || []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [audience, setAudience] = useState<number>(tweet?.audience || 0);

  const { createTweetMutation, updateTweetMutation } = useTweetQuery(user?._id);

  const { uploadMedias } = useUpload();

  const { updateHashTags } = useHashtag();

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || [];
    if (files?.length > 0) {
      const newMedia: TMedia[] = Array.from(files).map((file: File) => ({
        id: uuid(),
        file,
        url: URL.createObjectURL(file),
        type: file.type.split("/")[0],
      }));
      setMedia(newMedia);
    }
  };

  const onCancelMedia = () => {
    setMedia([]);
    setInitialMedias([]);
  };

  const resetContent = () => {
    setBody("");
  };

  const resetAll = () => {
    onCancelMedia();
    setAudience(0);
    resetContent();
    setLoading(false);
  };

  const onSubmitSuccess = () => {
    const initialHashtags = tweet?.tags || [];
    const { hashtags: newHashtags } = extractMetadata(body || "") || [];
    updateHashTags(initialHashtags, newHashtags as string[]);
    resetAll();
  };

  const onSubmit = async () => {
    if (body || media.length > 0) {
      setLoading(true);
      let newMedia = [...initialMedias];
      if (media?.length > 0) {
        const mediaResponse = await uploadMedias(
          media?.map((media) => media.file as File) || []
        );
        if (mediaResponse?.filter(Boolean).length === 0) {
          setLoading(false);
          return;
        }
        newMedia = [...mediaResponse, ...initialMedias];
      }

      const { hashtags } = extractMetadata(body || "") || [];

      const newTweet: iCreateTweetDTO = {
        content: body,
        audience,
        media: newMedia,
        tags: hashtags,
      };

      if (tweet) {
        try {
          updateTweetMutation.mutate({
            tweetId: tweet._id,
            updatedTweet: newTweet,
          });
          onSubmitSuccess();
        } catch (error) {
          resetAll();
          console.log("error: ", error);
        }
      } else {
        try {
          createTweetMutation.mutate(newTweet);
          onSubmitSuccess();
        } catch (error) {
          resetAll();
          console.log("error: ", error);
        }
      }

      setLoading(false);
    }
  };

  return {
    body,
    loading,
    audience,
    media,
    initialMedias,

    setBody,
    onSubmit,
    setAudience,
    onChangeFile,
    onCancelImage: onCancelMedia,
  };
};

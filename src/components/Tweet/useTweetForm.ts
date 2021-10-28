import { useHashtag } from "@talons/useHashtag";
import { useTweets } from "@talons/useTweets";
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

    const user: iUser = new UserModel(useQueryClient().getQueryData(
        USER_QUERY.GET_ME
    )).getData();


    const [body, setBody] = useState(tweet?.content || "");
    const [media, setMedia] = useState<TMedia[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [audience, setAudience] = useState<number>(tweet?.audience || 0);

    const {
        createTweetMutation,
        updateTweetMutation,
    } = useTweets(user?._id);

    const {
        uploadMultiMedia
    } = useUpload();

    const {
        updateHashTags
    } = useHashtag();


    const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files || [];
        if (files?.length > 0) {
            const newMedia: TMedia[] = Array.from(files).map((file: File) => ({
                id: uuid(),
                file,
                url: URL.createObjectURL(file),
                type: file.type.split("/")[0]
            }));
            setMedia(newMedia);
        }
    };

    const onCancelMedia = () => {
        setMedia([]);
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
        console.log('Go update onSubmitSuccess ');
        const initialHashtags = tweet?.tags || [];
        const { hashtags: newHashtags } = extractMetadata(body || "") || [];
        updateHashTags(initialHashtags, newHashtags as string[]);
        resetAll();
    };


    const onSubmit = async () => {
        if (body || media.length > 0) {
            setLoading(true);
            const mediaResponse = await uploadMultiMedia(media?.map(media => media.file as File) || []);
            const { hashtags } = extractMetadata(body || "") || [];

            const newTweet: iCreateTweetDTO = {
                content: body,
                audience,
                media: mediaResponse,
                tags: hashtags?.map(tag => tag.substring(1)) || []
            };


            if (tweet) {
                try {
                    await updateTweetMutation.mutateAsync({ tweetId: tweet._id, updatedTweet: newTweet });
                    onSubmitSuccess();
                } catch (error) {
                    resetAll();
                    console.log('error: ', error);
                }

            } else {
                try {
                    await createTweetMutation.mutateAsync(newTweet);
                    onSubmitSuccess();
                } catch (error) {
                    resetAll();
                    console.log('error: ', error);
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

        setBody,
        onSubmit,
        setAudience,
        onChangeFile,
        onCancelImage: onCancelMedia,
    };
};
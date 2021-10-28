import { useTweets } from "@talons/useTweets";
import { useUpload } from "@talons/useUpload";
import { TMedia } from "@type/app.types";
import { iCreateTweetDTO, iTweet } from "@type/tweet.types";
import { iUser } from "@type/user.types";
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

    const onSubmit = async () => {
        if (body || media.length > 0) {
            setLoading(true);
            const mediaResponse = await uploadMultiMedia(media?.map(media => media.file as File) || []);

            const newTweet: iCreateTweetDTO = {
                content: body,
                audience,
                media: mediaResponse,
            };

            if (tweet) {
                updateTweetMutation.mutate({ tweetId: tweet._id, updatedTweet: newTweet }, {
                    onSettled: () => {
                        resetAll();
                        setLoading(false);
                    },
                    onError: (error) => {
                        resetAll();
                        console.log(error);
                    }
                });
            } else {

                createTweetMutation.mutate(newTweet, {
                    onSettled: () => {
                        resetAll();
                        setLoading(false);
                    },
                    onError: (error) => {
                        resetAll();
                        console.log(error);
                    }
                });
            }
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
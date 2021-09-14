import { useTweets } from "@talons/useTweets";
import { useUpload } from "@talons/useUpload";
import { iCreateTweetDTO, iTweet } from "@type/tweet.types";
import { iUser } from "@type/user.types";
import { USER_QUERY } from "constants/user.constants";
import { UserModel } from "model/user.model";
import { ChangeEvent, useState } from "react";
import { useQueryClient } from "react-query";

type Props = {
    tweet?: iTweet;
}

export const useTweetForm = ({ tweet }: Props) => {

    const user: iUser = new UserModel(useQueryClient().getQueryData(
        USER_QUERY.GET_ME
    )).getData();

    const [content, setContent] = useState<string>(tweet?.content || "");
    const [audience, setAudience] = useState<number>(tweet?.audience || 0);
    const [loading, setLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<FileList | never[]>([]);
    const [imagesPreview, setImagesPreview] = useState<string[]>(tweet?.media || []);

    const {
        createTweetMutation,
        updateTweetMutation,
    } = useTweets(user?._id);

    const {
        uploadImages
    } = useUpload();

    const onChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
        const newContent = event?.target?.value || '';

        if (newContent !== content) {
            setContent(newContent);
        }

    }
    const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files || [];
        if (files?.length > 0) {
            setFiles(files);
            setImagesPreview(Array.from(files).map(file => URL.createObjectURL(file)));
        }
    };

    const onCancelImage = () => {
        setFiles([]);
        setImagesPreview([]);
    };

    const resetFiles = () => {
        setFiles([]);
        setImagesPreview([]);
    }

    const resetAll = () => {
        resetFiles();
        setContent('');
        setAudience(0);
        setLoading(false);
    }

    const onSubmit = async () => {
        if (content || files.length > 0) {
            setLoading(true);
            const imageResponses = await uploadImages(files);
            const newTweet: iCreateTweetDTO = {
                content,
                audience,
                media: imageResponses,
            }

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
    }

    return {
        loading,
        content,
        audience,
        imagesPreview,

        onSubmit,
        setContent,
        setAudience,
        onChangeFile,
        onCancelImage,
        onChangeContent,
    }



}
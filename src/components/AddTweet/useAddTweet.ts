import { ChangeEvent, useState } from "react";
import { useTweet } from "@talons/useTweet"
import { useUpload } from "@talons/useUpload";
import { iCreateTweetDTO } from "@type/tweet.types";
import { useQueryClient } from "react-query";
import { USER_QUERY } from "constants/user.constants";
import { iUser } from "@type/user.types";

export const useAddTweet = () => {

    const user: iUser | undefined = useQueryClient().getQueryData(
        USER_QUERY.GET_ME
    );

    const [content, setContent] = useState<string>('');
    const [audience, setAudience] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<FileList | never[]>([]);
    const [imagesPreview, setImagesPreview] = useState<string[]>([]);

    const {
        createTweetMutation
    } = useTweet(user?._id);

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
            const images = imageResponses && imageResponses.length > 0 && imageResponses?.map(imageResponse => imageResponse.url) || [];
            const newTweet: iCreateTweetDTO = {
                content,
                audience,
                media: images,
            }

            createTweetMutation.mutate(newTweet, {
                onSettled: () => {
                    setLoading(false);
                },
                onError: (error) => {
                    resetAll();
                    console.log(error);
                }
            });
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
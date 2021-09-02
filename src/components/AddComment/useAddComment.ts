import { useComment } from "@talons/useComment";
import { useUpload } from "@talons/useUpload";
import { useUser } from "@talons/useUser";
import { ChangeEvent, useState } from "react";

export const useAddComment = ({
    tweetId = ""
}) => {

    const [comment, setComment] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const { user } = useUser();
    const { uploadImage } = useUpload();
    const { createCommentMutation } = useComment({
        userId: user?._id,
        tweetId
    })

    const onChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const onCancelImage = () => {
        setFile(null);
        setImagePreview("");
    };

    const resetFields = () => {
        onCancelImage();
        setComment("");
    }

    const onSubmit = async (event: any) => {
        event.preventDefault();
        let media = '';
        if (file) {
            media = await uploadImage(file);
        }
        const newComment = {
            content: comment,
            media,
        }
        createCommentMutation.mutate({
            newComment,
            tweetId
        }, {
            onSettled: () => {
                resetFields();
            }
        });
    };


    return {
        user,
        file,
        comment,
        imagePreview,
        error: createCommentMutation.error,
        loading: createCommentMutation.isLoading,

        onSubmit,
        onChangeFile,
        onCancelImage,
        onChangeComment,
    }

}
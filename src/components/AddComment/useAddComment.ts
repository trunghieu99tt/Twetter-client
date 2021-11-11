import { useComment } from "@talons/useComment";
import { useUpload } from "@talons/useUpload";
import { useUser } from "@talons/useUser";
import { TMedia } from "@type/app.types";
import { ChangeEvent, useState } from "react";
import { v4 } from "uuid";

type Props = {
    tweetId: string;
    commentId?: string;
};

export const useAddComment = ({
    tweetId,
    commentId
}: Props) => {

    const [comment, setComment] = useState<string>("");
    const [media, setMedia] = useState<TMedia | null>(null);

    const { user } = useUser();
    const { uploadSingleMedia } = useUpload();

    const { createCommentMutation } = useComment({
        userId: user?._id,
        tweetId,
    });

    const onChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const newMedia: TMedia = ({
                id: v4(),
                file,
                url: URL.createObjectURL(file),
                type: file.type.split("/")[0]
            });
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
        let url = '';
        if (media?.file) {
            url = await uploadSingleMedia(media?.file);
        }
        const newComment = {
            content: comment,
            media: url,
        };
        createCommentMutation.mutate({
            newComment,
            parentId: commentId || tweetId
        }, {
            onSettled: () => {
                resetFields();
            }
        });
    };


    return {
        user,
        media,
        comment,
        error: createCommentMutation.error,
        loading: createCommentMutation.isLoading,

        onSubmit,
        onChangeFile,
        onCancelMedia,
        onChangeComment,
    };

};
import { useUser } from "@talons/useUser";
import { TImageInput } from "@type/app.types";
import { iUser } from "@type/user.types";
import { ChangeEvent, useCallback, useState } from "react";
import { useUpload } from '../../../talons/useUpload';
import { toast } from 'react-toastify';
import throttle from "lodash.throttle";


type Props = {
    data: iUser;
    closeForm: () => void;
};

export const useEditInfo = ({ data, closeForm }: Props) => {
    const [name, setName] = useState<string>(data?.name || '');
    const [bio, setBio] = useState<string>(data?.bio || '');
    const [dob, setDob] = useState<Date>(new Date(data.birthday));
    const [newAvatar, setNewAvatar] = useState<TImageInput>({
        file: null,
        preview: data.avatar,
    });
    const [newCover, setNewCover] = useState<TImageInput>({
        file: null,
        preview: data.coverPhoto,
    });
    const [updating, setUpdating] = useState<boolean>(false);

    const { uploadImage } = useUpload();
    const { updateUserMutation } = useUser();

    const logError = useCallback(
        throttle(
            (limit) =>
                toast.error(
                    `Text is too long! Length of text must be less than ${limit}`
                ),
            2000
        ),
        []
    );

    const onChangeField = (e: ChangeEvent<HTMLInputElement>, limit: number) => {
        const value = e.target.value;

        if (value.trim().length <= limit) {
            switch (e.target.name) {
                case 'name':
                    setName(value);
                    break;
                case 'bio':
                    setBio(value);
                    break;
            }
        }
        else {
            logError(limit);
        }

    };

    const onChangePicture = (e: ChangeEvent<HTMLInputElement>) => {
        const { name: targetName, files } = e.target;
        if (files && files?.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = () => {
                console.log(`targetName`, targetName);
                const newState = {
                    file: files[0],
                    preview: reader.result as string,
                };
                if (targetName === 'avatar') {
                    setNewAvatar(newState);
                } else {
                    setNewCover(newState);
                }
            };
        }
    };

    const onCancelChangePicture = (targetName: string) => {
        const initialState = {
            file: null,
            preview: null
        };
        if (targetName === 'avatar') {
            setNewAvatar(initialState);
        } else {
            setNewCover(initialState);
        }
    };

    const onUpdateInfo = async () => {

        setUpdating(true);
        let avatar = data.avatar;
        let coverPhoto = data.coverPhoto;

        if (newAvatar.file) {
            avatar = await uploadImage(newAvatar.file);
        }

        if (newCover.file) {
            coverPhoto = await uploadImage(newCover.file);
        }

        const newInfo: Partial<iUser> = {
            bio,
            name,
            avatar,
            coverPhoto,
            birthday: dob,
        };

        await updateUserMutation.mutateAsync({
            updatedUser: newInfo,
            userId: data._id,
        });

        setUpdating(false);
        closeForm();

    };



    return {
        bio,
        dob,
        name,
        newCover,
        newAvatar,
        updating,

        setDob,
        onUpdateInfo,
        onChangeField,
        onChangePicture,
        onCancelChangePicture
    };

};
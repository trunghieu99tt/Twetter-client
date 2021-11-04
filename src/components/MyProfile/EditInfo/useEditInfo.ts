import { useUser } from "@talons/useUser";
import { TImageInput } from "@type/app.types";
import { iUpdateUserDTO, iUser } from "@type/user.types";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { useUpload } from '../../../talons/useUpload';
import { useTranslation } from 'react-i18next';

type Props = {
    data: iUser;
    onCancel: () => void;
};

export const useEditInfo = ({ data, onCancel }: Props) => {

    const { t } = useTranslation();

    const [userInfo, setUserInfo] = useState<Partial<iUser>>({
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        bio: data.bio,
        birthday: data?.birthday ? new Date(data.birthday) : new Date(),
        gender: data.gender,
    });

    const [updatePasswordData, setUpdatePasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
    });

    const [showUpdatePassword, setShowUpdatePassword] = useState<boolean>(false);

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

    const onChangeSpecificBasicInfoField = (name: string, value: any) => {
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const onChangeBasicInfoFields = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChangeSpecificBasicInfoField(name, value);
    };


    const onChangePasswordFields = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatePasswordData({
            ...updatePasswordData,
            [name]: value
        });
    };

    const checkPasswordMatch = () => {
        return updatePasswordData.newPassword === updatePasswordData.newPasswordConfirm;
    };

    const onUpdateInfo = async () => {

        if (!checkPasswordMatch) {
            toast.error(t('passwordMisMatch'));
            return;
        }

        setUpdating(true);
        try {

            let avatar = data.avatar;
            let coverPhoto = data.coverPhoto;

            if (newAvatar.file) {
                avatar = await uploadImage(newAvatar.file);
            }

            if (newCover.file) {
                coverPhoto = await uploadImage(newCover.file);
            }

            let newInfo: iUpdateUserDTO = {
                ...userInfo,
                avatar,
                coverPhoto,
            };

            if (showUpdatePassword) {
                newInfo = {
                    ...newInfo,
                    ...updatePasswordData
                };
            }

            await updateUserMutation.mutateAsync({
                updatedUser: newInfo,
                userId: data._id,
            });

            toast.success(t('updateSuccess'));
            onCancel();
        } catch (error: any) {
            const message = error?.response?.data?.error || t('unknownError');
            toast.error(message);
        }
        setUpdating(false);

    };

    const toggleShowUpdatePassword = () => setShowUpdatePassword(v => !v);

    const isDisabledUpdate = updating || updateUserMutation.isLoading;


    return {
        userInfo,
        newCover,
        newAvatar,
        isDisabledUpdate,
        showUpdatePassword,
        updatePasswordData,

        onUpdateInfo,
        onChangePicture,
        onCancelChangePicture,
        onChangeBasicInfoFields,
        onChangePasswordFields,
        toggleShowUpdatePassword,
        onChangeSpecificBasicInfoField,
    };

};
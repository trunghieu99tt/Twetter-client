import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

// utils
import client from "api/client";
import { validateEmail } from "@utils/helper";

type Props = {
    onClose: () => void;
};

const useForgotPassword = ({ onClose }: Props) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState<string>("");

    const onSubmit = async () => {
        if (validateEmail(email)) {
            try {
                const response = await client.post('/auth/forgot-password', {
                    email
                });
                if (response?.data?.statusCode === 200) {
                    toast.success(t('forgotPasswordSuccess'));
                    onClose();
                } else {
                    toast.error(t('error.unknownError'));
                }
            } catch (error: any) {
                console.log(`error`, error);
                toast.error(error?.response?.data?.message || t('error.unknownError'));
            }
        } else {
            toast.error(t("error.invalidEmail"));
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return {
        email,
        onChange,
        onSubmit
    };

};

export { useForgotPassword };
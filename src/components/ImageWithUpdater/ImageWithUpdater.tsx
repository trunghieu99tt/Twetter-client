import React from "react";
import { useTranslation } from "react-i18next";

// icons
import { BiCamera } from "react-icons/bi";

// types
import { TImageInput } from "@type/app.types";

import {
    Wrapper,
    OkButton,
    MainImage,
    LoadingStyle,
    CancelButton,
    UpdateWrapper,
    ActionButtons,
} from "./ImageWithUpdaterStyle";
import { Spinner2 } from "@components/Loaders";

interface Props {
    id: string;
    name: string;
    image: string;
    data: TImageInput;
    shouldHaveUpdate: boolean;
    isDisabledUpdate: boolean;
    wrapperCustomStyles?: string;

    onOk?: () => void;
    onCancel: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageWithUpdater = ({
    id,
    data,
    name,
    image,
    isDisabledUpdate,
    shouldHaveUpdate,
    wrapperCustomStyles = "",

    onOk,
    onCancel,
    onChange,
}: Props) => {
    const { t } = useTranslation();

    return (
        <Wrapper customStyles={wrapperCustomStyles}>
            {isDisabledUpdate && (
                <LoadingStyle>
                    <Spinner2 customStyles="--size: 2rem;" />
                </LoadingStyle>
            )}
            <MainImage src={image} alt={`${name}-${id}`} />
            {shouldHaveUpdate && (
                <UpdateWrapper>
                    {!data?.file ? (
                        <React.Fragment>
                            <label htmlFor={id}>
                                <BiCamera />
                                <span>{t("updateYourAvatar")}</span>
                            </label>
                            <input
                                type="file"
                                id={id}
                                accept="image/*"
                                onChange={onChange}
                                name={name}
                            />
                        </React.Fragment>
                    ) : (
                        <ActionButtons>
                            {onOk && (
                                <OkButton
                                    onClick={onOk}
                                    disabled={isDisabledUpdate}
                                >
                                    {t("update")}
                                </OkButton>
                            )}
                            <CancelButton
                                onClick={onCancel}
                                disabled={isDisabledUpdate}
                            >
                                {t("cancel")}
                            </CancelButton>
                        </ActionButtons>
                    )}
                </UpdateWrapper>
            )}
        </Wrapper>
    );
};

export default ImageWithUpdater;

import React from "react";

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
    wrapperCustomStyles = "",

    onOk,
    onCancel,
    onChange,
}: Props) => {
    return (
        <Wrapper customStyles={wrapperCustomStyles}>
            {isDisabledUpdate && (
                <LoadingStyle>
                    <Spinner2 customStyles="--size: 2rem;" />
                </LoadingStyle>
            )}
            <MainImage src={image} alt={`${name}-${id}`} />
            <UpdateWrapper>
                {!data?.file ? (
                    <React.Fragment>
                        <label htmlFor={id}>
                            <BiCamera />
                            <span>Update your avatar</span>
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
                                Update
                            </OkButton>
                        )}
                        <CancelButton
                            onClick={onCancel}
                            disabled={isDisabledUpdate}
                        >
                            Cancel
                        </CancelButton>
                    </ActionButtons>
                )}
            </UpdateWrapper>
        </Wrapper>
    );
};

export default ImageWithUpdater;

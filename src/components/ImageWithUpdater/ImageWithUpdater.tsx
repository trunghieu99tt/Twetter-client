import { Spinner2 } from "@components/Loaders";
import Button from "@components/shared/Button";
import { TImageInput } from "@type/app.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiCamera } from "react-icons/bi";
import {
  ActionButtons,
  CancelButton,
  LoadingStyle,
  MainImage,
  UpdateWrapper,
  Wrapper,
} from "./ImageWithUpdaterStyle";

interface Props {
  id: string;
  name: string;
  image: string;
  label: string;
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
  label,
  isDisabledUpdate,
  shouldHaveUpdate,
  wrapperCustomStyles = "",

  onOk,
  onCancel,
  onChange,
}: Props): JSX.Element => {
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
                <span>{label}</span>
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
                <Button onClick={onOk} disabled={isDisabledUpdate}>
                  {t("update")}
                </Button>
              )}
              <CancelButton onClick={onCancel} disabled={isDisabledUpdate}>
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

import React, { Suspense } from "react";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";

// talons
import { useEditInfo } from "./useEditInfo";

// components
const Modal = React.lazy(() => import("@components/Modal"));
import GenderSelector from "@components/Auth/GenderSelector";
import ImageWithUpdater from "@components/ImageWithUpdater/ImageWithUpdater";

// types
import { iUser } from "@type/user.types";

// styles
import {
  Wrapper,
  EditItem,
  EditItemList,
  EditItemLabel,
  EditItemInput,
  ToggleUpdatePasswordBtn,
} from "./EditInfoStyle";
import { Flex } from "@shared/style/sharedStyle.style";

interface Props {
  data: iUser;
  onCancel: () => void;
}

const EditInfo = ({ data, onCancel }: Props) => {
  const { t } = useTranslation();

  const {
    userInfo,
    newCover,
    newAvatar,
    isDisabledUpdate,
    showUpdatePassword,

    onUpdateInfo,
    onChangePicture,
    updatePasswordData,
    onCancelChangePicture,
    onChangeBasicInfoFields,
    onChangePasswordFields,
    toggleShowUpdatePassword,
    onChangeSpecificBasicInfoField,
  } = useEditInfo({ data, onCancel });

  const body = (
    <Wrapper>
      <Flex gap="5rem">
        <EditItem>
          <EditItemLabel>{t("coverPhoto")}</EditItemLabel>
          <ImageWithUpdater
            shouldHaveUpdate={true}
            data={newCover}
            name="coverPhoto"
            label={t("updateCoverPhoto")}
            isDisabledUpdate={isDisabledUpdate}
            image={newCover?.preview || data?.coverPhoto}
            id={`update-cover-photo-${data._id}`}
            onCancel={() => onCancelChangePicture("coverPhoto")}
            onChange={onChangePicture}
          />
        </EditItem>
        <EditItem>
          <EditItemLabel>{t("avatar")}</EditItemLabel>
          <ImageWithUpdater
            shouldHaveUpdate={true}
            data={newAvatar}
            name="avatar"
            label={t("updateYourAvatar")}
            isDisabledUpdate={isDisabledUpdate}
            image={newAvatar?.preview || data?.avatar}
            id={`update-avatar-photo-${data._id}`}
            onCancel={() => onCancelChangePicture("avatar")}
            onChange={onChangePicture}
          />
        </EditItem>
      </Flex>
      <EditItemList>
        <EditItem>
          <EditItemLabel>{t("name")}</EditItemLabel>
          <EditItemInput
            name="name"
            value={userInfo.name}
            onChange={onChangeBasicInfoFields}
          />
        </EditItem>
        <EditItem>
          <EditItemLabel>{t("email")}</EditItemLabel>
          <EditItemInput
            name="email"
            value={userInfo.email}
            onChange={onChangeBasicInfoFields}
          />
        </EditItem>
        <EditItem>
          <EditItemLabel>{t("bio")}</EditItemLabel>
          <EditItemInput
            name="bio"
            value={userInfo.bio}
            onChange={onChangeBasicInfoFields}
          />
        </EditItem>
        <EditItem>
          <EditItemLabel>{t("gender")}</EditItemLabel>
          <GenderSelector
            gender={userInfo.gender!}
            setGender={(gender: number) => {
              onChangeSpecificBasicInfoField("gender", gender);
            }}
          />
        </EditItem>
        <EditItem>
          <EditItemLabel>{t("birthday")}</EditItemLabel>
          <DatePicker
            selected={userInfo.birthday}
            onChange={(date: Date) =>
              onChangeSpecificBasicInfoField("birthday", date)
            }
          />
        </EditItem>
      </EditItemList>
      <ToggleUpdatePasswordBtn onClick={toggleShowUpdatePassword}>
        {t("updatePassword")}
      </ToggleUpdatePasswordBtn>
      {showUpdatePassword && (
        <EditItemList>
          <EditItem>
            <EditItemLabel>{t("oldPassword")}</EditItemLabel>
            <EditItemInput
              type="password"
              name="oldPassword"
              value={updatePasswordData.oldPassword}
              onChange={onChangePasswordFields}
            />
          </EditItem>
          <EditItem>
            <EditItemLabel>{t("newPassword")}</EditItemLabel>
            <EditItemInput
              type="password"
              name="newPassword"
              value={updatePasswordData.newPassword}
              onChange={onChangePasswordFields}
            />
          </EditItem>
          <EditItem>
            <EditItemLabel>{t("confirmNewPassword")}</EditItemLabel>
            <EditItemInput
              type="password"
              name="newPasswordConfirm"
              value={updatePasswordData.newPasswordConfirm}
              onChange={onChangePasswordFields}
            />
          </EditItem>
        </EditItemList>
      )}
    </Wrapper>
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Modal
        header={<h3>{t("changeUserInfo")}</h3>}
        isOpen={true}
        body={body}
        onOk={onUpdateInfo}
        onCancel={onCancel}
      />
    </Suspense>
  );
};

export default EditInfo;

import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";

// talons
import { useEditInfo } from "./useEditInfo";

// components
import Modal from "@components/Modal";
import ImageWithUpdater from "@components/ImageWithUpdater/ImageWithUpdater";

// types
import { iUser } from "@type/user.types";

// styles
import {
    Wrapper,
    EditItem,
    EditItemLabel,
    EditItemInput,
} from "./EditInfoStyle";
import { Flex } from "@shared/style/sharedStyle.style";
import { Spinner1 } from "@components/Loaders";

interface Props {
    data: iUser;
    onCancel: () => void;
}

const EditInfo = ({ data, onCancel }: Props) => {
    const { t } = useTranslation();

    const {
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
        onCancelChangePicture,
    } = useEditInfo({ data, closeForm: onCancel });

    const body = (
        <Wrapper>
            {updating && <Spinner1 />}
            <Flex gap="5rem">
                <EditItem>
                    <EditItemLabel>{t("coverPhoto")}</EditItemLabel>
                    <ImageWithUpdater
                        data={newCover}
                        name="coverPhoto"
                        isDisabledUpdate={updating}
                        image={newCover?.preview || data?.coverPhoto}
                        id={`update-cover-photo-${data._id}`}
                        onCancel={() => onCancelChangePicture("coverPhoto")}
                        onChange={onChangePicture}
                    />
                </EditItem>
                <EditItem>
                    <EditItemLabel>{t("avatar")}</EditItemLabel>
                    <ImageWithUpdater
                        data={newAvatar}
                        name="avatar"
                        isDisabledUpdate={updating}
                        image={newAvatar?.preview || data?.avatar}
                        id={`update-avatar-photo-${data._id}`}
                        onCancel={() => onCancelChangePicture("avatar")}
                        onChange={onChangePicture}
                    />
                </EditItem>
            </Flex>
            <EditItem>
                <EditItemLabel>{t("name")}</EditItemLabel>
                <EditItemInput
                    name="name"
                    value={name}
                    onChange={(e) => onChangeField(e, 50)}
                />
            </EditItem>
            <EditItem>
                <EditItemLabel>{t("bio")}</EditItemLabel>
                <EditItemInput
                    name="bio"
                    value={bio}
                    onChange={(e) => onChangeField(e, 100)}
                />
            </EditItem>
            <EditItem>
                <EditItemLabel>{t("birthday")}</EditItemLabel>
                <DatePicker
                    selected={dob}
                    onChange={(date: Date) => setDob(date)}
                    maxDate={new Date()}
                />
            </EditItem>
        </Wrapper>
    );

    return (
        <Modal
            header={<h3>{t("changeUserInfo")}</h3>}
            isOpen={true}
            body={body}
            onOk={onUpdateInfo}
            onCancel={onCancel}
        />
    );
};

export default EditInfo;

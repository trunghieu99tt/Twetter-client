import DatePicker from "react-datepicker";

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
                    <EditItemLabel>Cover Photo</EditItemLabel>
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
                    <EditItemLabel>Avatar</EditItemLabel>
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
                <EditItemLabel>Name</EditItemLabel>
                <EditItemInput
                    name="name"
                    value={name}
                    onChange={(e) => onChangeField(e, 50)}
                />
            </EditItem>
            <EditItem>
                <EditItemLabel>Bio</EditItemLabel>
                <EditItemInput
                    name="bio"
                    value={bio}
                    onChange={(e) => onChangeField(e, 100)}
                />
            </EditItem>
            <EditItem>
                <EditItemLabel>Birthday</EditItemLabel>
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
            header={<h3>Change user info</h3>}
            isOpen={true}
            body={body}
            onOk={onUpdateInfo}
            onCancel={onCancel}
        />
    );
};

export default EditInfo;

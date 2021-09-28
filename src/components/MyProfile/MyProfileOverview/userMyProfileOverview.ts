import { useUpload } from '@talons/useUpload';
import { useUser } from '@talons/useUser';
import { iRoom } from '@type/room.types';
import { iUser } from '@type/user.types';
import { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { connectedRoomsState, joinDMRoomState } from 'states/room.state';

type LIST_TYPE = "followers" | "following" | "";
type MODAL_TYPE = "list_user" | "update_info" | "";

type Props = {
    user: iUser
}

export const useMyProfileOverview = ({
    user,
}: Props) => {
    const connectedRooms = useRecoilValue(connectedRoomsState);
    const setJoinRoomState = useSetRecoilState(joinDMRoomState);
    const { user: currentUser, followUserMutation, updateUserMutation } = useUser();
    const { uploadImage } = useUpload();
    const history = useHistory();

    const [listType, setListType] = useState<LIST_TYPE>("");
    const [modalType, setModalType] = useState<MODAL_TYPE>("");
    const [isVisibleEditForm, setIsVisibleEditForm] = useState<boolean>(false);
    const [newAvatar, setNewAvatar] = useState<{
        file: File | null;
        preview: string;
    }>({
        file: null,
        preview: "",
    });
    const [updating, setUpdating] = useState<boolean>(false);

    const showFollowers = () => setListType("followers");

    const showFollowing = () => setListType("following");

    const closeModal = () => {
        setModalType("");
    }

    const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setNewAvatar({
                    file,
                    preview: reader.result as string,
                });
            }
        }
    }

    const onCancelChangeAvatar = () =>
        setNewAvatar({
            file: null,
            preview: "",
        });

    const updateUserAvatar = async () => {
        if (newAvatar.file) {
            setUpdating(true);
            try {
                const newAvatarUrl = await uploadImage(newAvatar.file);
                updateUserMutation.mutate({
                    updatedUser: {
                        avatar: newAvatarUrl,
                    },
                    userId: user?._id,
                });
                onCancelChangeAvatar();
            } catch (error) {
                console.log("error: ", error);
            }
            setUpdating(false);
        }
    };

    const onGoChat = (userId: string) => {
        const userIds = [currentUser._id, userId].sort();
        // Check if we already has room with these users
        const room = connectedRooms?.find((room: iRoom) => {
            if (room.isDm) {
                const roomMembers = room.members
                    .map((u: iUser) => u._id)
                    .sort();

                return JSON.stringify(roomMembers) === JSON.stringify(userIds);
            }

            return false;
        });

        if (room) {
            history.push(`/chat/${room._id}`);
        } else {
            setJoinRoomState({ userIds });
        }
    };

    const updateFollowStatus = (userId: string) => followUserMutation.mutate(userId)


    const followed = currentUser?.following.some((u: iUser) => {
        return u._id === user._id;
    });

    const followers: iUser[] = user.followers;
    const following: iUser[] = user.following;

    let followerOrFollowingList: iUser[];

    switch (listType) {
        case "followers":
            followerOrFollowingList = followers;
            break;
        case "following":
            followerOrFollowingList = following;
            break;
        default:
            followerOrFollowingList = [];
    }

    const isMe = currentUser?._id === user?._id || false;
    const isDisabledUpdate = updating || updateUserMutation.isLoading;


    return {
        isMe,
        user,
        listType,
        followed,
        modalType,
        updating,
        newAvatar,
        isDisabledUpdate,
        isVisibleEditForm,
        followerOrFollowingList,
        updatingFollowStatus: followUserMutation.isLoading,

        onGoChat,
        closeModal,
        showFollowers,
        showFollowing,
        onChangeAvatar,
        updateUserAvatar,
        updateFollowStatus,
        onCancelChangeAvatar,
        setIsVisibleEditForm,
    }
}
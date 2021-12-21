import { useNotify } from "@talons/useNotify";
import { useUpload } from "@talons/useUpload";
import { useUser } from "@talons/useUser";
import { iNotificationDTO } from "@type/notify.types";
import { iRoom } from "@type/room.types";
import { iUser } from "@type/user.types";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { connectedRoomsState, joinRoomState } from "states/room.state";

type LIST_TYPE = "followers" | "following" | "";
type MODAL_TYPE = "list_user" | "update_info" | "";

type Props = {
    user: iUser;
};

export const useMyProfileOverview = ({ user }: Props) => {
    const connectedRooms = useRecoilValue(connectedRoomsState);
    const setJoinRoomState = useSetRecoilState(joinRoomState);
    const {
        user: currentUser,
        followUserMutation,
        updateUserMutation,
    } = useUser();
    const { uploadImage } = useUpload();
    const { createNotificationAction } = useNotify();
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
        setListType("");
    };

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
            };
        }
    };

    const resetData = () =>
        setNewAvatar({
            file: null,
            preview: "",
        });

    const updateUserAvatar = async () => {
        if (newAvatar.file) {
            setUpdating(true);
            try {
                const newAvatarUrl = await uploadImage(newAvatar.file);
                await updateUserMutation.mutateAsync({
                    updatedUser: {
                        avatar: newAvatarUrl,
                    },
                    userId: user?._id,
                });
                resetData();
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
            setJoinRoomState({
                owner: currentUser._id,
                members: [currentUser._id, userId],
            });
        }
    };

    useEffect(() => {
        resetData();
        closeModal();
    }, [user]);

    const updateFollowStatus = (userId: string) => {
        followUserMutation.mutate(userId, {
            onSuccess: (res) => {
                if (res?.statusCode === 200) {
                    const didCurrentUserFollowed = currentUser?.following?.some(
                        (u) => u._id === userId
                    );

                    if (!didCurrentUserFollowed) {
                        // create notification
                        const msg: iNotificationDTO = {
                            text: "followedYou",
                            receivers: [userId],
                            url: `/profile/${currentUser._id}`,
                            type: "save",
                        };

                        createNotificationAction(msg);
                    }
                }
            },
        });
    };

    const followed = currentUser?.following.some((u: iUser) => {
        return u._id === user._id;
    });

    const followers: iUser[] = user.followers;
    const following: iUser[] = user.following;

    let followerOrFollowingList: iUser[];

    switch (listType) {
        case "followers":
            followerOrFollowingList = followers.filter((u: iUser) => {
                return u._id !== user._id;
            });
            break;
        case "following":
            followerOrFollowingList = following.filter((u: iUser) => {
                return u._id !== user._id;
            });
            break;
        default:
            followerOrFollowingList = [];
    }

    const isMe = currentUser?._id === user?._id || false;

    return {
        isMe,
        user,
        listType,
        followed,
        modalType,
        updating,
        newAvatar,
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
        onCancelChangeAvatar: resetData,
        setIsVisibleEditForm,
    };
};

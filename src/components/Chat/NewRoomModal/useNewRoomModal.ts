import { iUser } from "@type/user.types";
import { useState } from "react";
import debounce from "lodash.debounce";
import { requestSearch } from "@pages/Search/useSearch";
import { iRoomDTO } from "@type/room.types";
import { TMedia } from "@type/app.types";
import { v4 } from "uuid";
import { useRooms } from "@talons/useRoom";
import { useUpload } from "@talons/useUpload";
import { useUser } from "@talons/useUser";
import { toast } from "react-toastify";
import { useAppContext } from "@context/app.context";
import { useHistory } from "react-router";

const useNewRoomModal = () => {
    const { dispatch } = useAppContext();
    const history = useHistory();

    const { createNewRoom } = useRooms();
    const { user: currentUser } = useUser();
    const { uploadSingleMedia } = useUpload();

    const [roomInfo, setRoomInfo] = useState<iRoomDTO>({
        name: "",
        description: "",
        members: [],
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [media, setMedia] = useState<TMedia | null>(null);
    const [suggestion, setSuggestion] = useState<iUser[]>([]);
    const [newGroupChatUserList, setNewGroupUserList] = useState<iUser[]>([]);

    const onAddToNewGroupUserList = (user: iUser) => {
        if (!newGroupChatUserList.some((u: iUser) => u._id === user._id)) {
            setNewGroupUserList((v) => [...v, user]);
        }
        setSuggestion([]);
    };

    const onRemoveUserFromNewGroupUserList = (user: iUser) => {
        setNewGroupUserList((v) => v.filter((u: iUser) => u._id !== user._id));
    };

    const searchUser = async (value: string) => {
        const { data } = await requestSearch({
            search: value,
            category: "people",
        });
        const filteredUsers = data.filter((user: iUser) => {
            return (
                user._id !== currentUser._id &&
                !newGroupChatUserList.some((u: iUser) => u._id === user._id)
            );
        });
        setSuggestion(filteredUsers);
    };

    // create a debounce function to trigger the search
    const debouncedSearch = debounce((value: string) => {
        if (value.trim().length > 0) {
            searchUser(value);
        } else {
            setSuggestion([]);
        }
    }, 500);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === "user") {
            debouncedSearch(value);
        } else {
            setRoomInfo((v) => ({
                ...v,
                [name]: value,
            }));
        }

        if (files && files?.length > 0) {
            const file = files?.[0];
            if (file) {
                const newMedia: TMedia = {
                    id: v4(),
                    file,
                    url: URL.createObjectURL(file),
                    type: file.type.split("/")[0],
                };
                setMedia(newMedia);
            }
        }
    };

    const onCreateNewChatGroup = async () => {
        try {
            newGroupChatUserList.push(currentUser);

            if (newGroupChatUserList.length < 2) {
                toast.error(
                    "Please add at least 2 people to create a group chat"
                );
                return;
            }
            setLoading(true);
            let image: string = "";
            if (media?.file) {
                image = await uploadSingleMedia(media.file);
            } else {
                image =
                    "https://res.cloudinary.com/dwefhvioc/image/upload/v1640711295/xi05jiws5gfl6grydmwi.jpg";
            }
            let membersIds =
                newGroupChatUserList.map((u: iUser) => u._id) || [];
            membersIds = Array.from(new Set(membersIds));

            if (membersIds.length < 2) {
                toast.error(
                    "Please add at least 2 people to create a group chat"
                );
                return;
            }

            const newRoom: iRoomDTO = {
                ...roomInfo,
                image,
                members: membersIds,
            };
            const newRoomResponse = await createNewRoom(newRoom);
            if (newRoomResponse?._id) {
                history.push(`/chat/${newRoomResponse._id}`);
            }
            dispatch({
                type: "SET_VISIBLE_ADD_GROUP_CHAT_MODAL",
                payload: false,
            });
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            console.log("error: ", error);
            toast.error(error.message);
        }
    };

    const onCloseModal = () =>
        dispatch({
            type: "SET_VISIBLE_ADD_GROUP_CHAT_MODAL",
            payload: false,
        });

    return {
        media,
        loading,
        suggestion,
        newGroupChatUserList,

        onChange,
        onCloseModal,
        onCreateNewChatGroup,
        onAddToNewGroupUserList,
        onRemoveUserFromNewGroupUserList,
    };
};

export { useNewRoomModal };

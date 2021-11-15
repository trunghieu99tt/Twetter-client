import { iUser } from "@type/user.types";
import { useState } from "react";
import debounce from "lodash.debounce";
import { requestSearch } from "@pages/Search/useSearch";
import { iRoomDTO } from "@type/room.types";
import { TMedia } from "@type/app.types";
import { v4 } from "uuid";
import { useRooms } from "@talons/useRoom";
import { useUpload } from "@talons/useUpload";

const useCreateNewGroupChat = () => {
    const { createNewRoom } = useRooms();
    const { uploadSingleMedia } = useUpload();

    const [roomInfo, setRoomInfo] = useState<iRoomDTO>({
        name: "",
        description: "",
        members: [],
    });
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
        setSuggestion(data);
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
        let image: string = "";
        if (media?.file) {
            image = await uploadSingleMedia(media.file);
        }

        const newRoom: iRoomDTO = {
            ...roomInfo,
            image,
            members: newGroupChatUserList?.map((user: iUser) => user._id) || [],
        };

        createNewRoom(newRoom);
    };

    return {
        media,
        suggestion,
        newGroupChatUserList,

        onChange,
        onCreateNewChatGroup,
        onAddToNewGroupUserList,
        onRemoveUserFromNewGroupUserList,
    };
};

export { useCreateNewGroupChat };

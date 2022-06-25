import { useAppContext } from "@context/app.context";
import { useRooms } from "@talons/useRoom";
import { useUpload } from "@talons/useUpload";
import { useUser } from "@talons/useUser";
import { TMedia } from "@type/app.types";
import { iRoomDTO } from "@type/room.types";
import { iUser } from "@type/user.types";
import _ from "lodash";
import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { v4 } from "uuid";

const useNewRoomModal = () => {
  const { dispatch } = useAppContext();
  const history = useHistory();

  const { createNewRoom } = useRooms();
  const { user: currentUser } = useUser();
  const { uploadMedia } = useUpload();

  const [roomInfo, setRoomInfo] = useState<iRoomDTO>({
    name: "",
    description: "",
    members: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [media, setMedia] = useState<TMedia | null>(null);
  const [isAddMemberForOpened, setIsAddMemberForOpened] =
    useState<boolean>(false);
  const [newGroupChatUserList, setNewGroupUserList] = useState<iUser[]>([]);

  const onAddToNewGroupUserList = (users: iUser[]) => {
    const newUserList = _.merge(newGroupChatUserList, users);
    setNewGroupUserList(newUserList);
  };

  const onRemoveUserFromNewGroupUserList = (user: iUser) => {
    setNewGroupUserList((v) => v.filter((u: iUser) => u._id !== user._id));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setRoomInfo((v) => ({
      ...v,
      [name]: value,
    }));

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
        toast.error("Please add at least 2 people to create a group chat");
        return;
      }
      setLoading(true);
      let image =
        "https://res.cloudinary.com/dwefhvioc/image/upload/v1640711295/xi05jiws5gfl6grydmwi.jpg";
      if (media?.file) {
        image = await uploadMedia(media.file);
        if (!image) {
          setLoading(false);
          return;
        }
      }
      const membersIds = Array.from(
        new Set(newGroupChatUserList.map((u: iUser) => u._id) || [])
      );

      if (membersIds.length < 2) {
        toast.error("Please add at least 2 people to create a group chat");
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

  const onOpenAddMemberModal = useCallback(() => {
    setIsAddMemberForOpened(true);
  }, []);

  const onCloseAddMemberModal = useCallback(() => {
    setIsAddMemberForOpened(true);
  }, []);

  return {
    media,
    loading,
    isAddMemberForOpened,
    newGroupChatUserList,

    onChange,
    onCloseModal,
    onCreateNewChatGroup,
    onAddToNewGroupUserList,
    onOpenAddMemberModal,
    onCloseAddMemberModal,
    onRemoveUserFromNewGroupUserList,
  };
};

export { useNewRoomModal };

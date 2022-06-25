import Button from "@components/shared/Button";
import { useAppContext } from "@context/app.context";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineMessage } from "react-icons/ai";
import RoomList from "../RoomList";
import {
  Wrapper,
  Heading,
  ChatList,
  ChatListWrapper,
  ToggleChatButton,
} from "./smallRoomListStyle";

const SmallRoomList = () => {
  const { t } = useTranslation();
  const { dispatch } = useAppContext();

  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleOpenChat = () => setIsChatOpen((value) => !value);

  const openCreateNewGroupChatModal = () => {
    dispatch({
      type: "SET_VISIBLE_ADD_GROUP_CHAT_MODAL",
      payload: true,
    });
  };

  return (
    <Wrapper>
      <ChatListWrapper isOpen={isChatOpen}>
        <Heading>{t("contact")}</Heading>
        <ChatList>
          <RoomList />
        </ChatList>
        <Button onClick={openCreateNewGroupChatModal}>
          {t("createNewGroupChat")}
        </Button>
      </ChatListWrapper>
      <ToggleChatButton onClick={toggleOpenChat}>
        <AiOutlineMessage />
      </ToggleChatButton>
    </Wrapper>
  );
};

export default SmallRoomList;

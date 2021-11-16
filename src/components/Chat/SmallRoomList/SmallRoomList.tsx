import { useState } from "react";
import { useTranslation } from "react-i18next";

// icons
import { AiOutlineMessage } from "react-icons/ai";

// components
import RoomList from "../RoomList";

// styles
import {
    Wrapper,
    Heading,
    ChatList,
    ChatListWrapper,
    ToggleChatButton,
} from "./smallRoomListStyle";

const SmallRoomList = () => {
    const { t } = useTranslation();

    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleOpenChat = () => setIsChatOpen((value) => !value);

    return (
        <Wrapper>
            <ChatListWrapper isOpen={isChatOpen}>
                <Heading>{t("contact")}</Heading>
                <ChatList>
                    <RoomList />
                </ChatList>
            </ChatListWrapper>
            <ToggleChatButton onClick={toggleOpenChat}>
                <AiOutlineMessage />
            </ToggleChatButton>
        </Wrapper>
    );
};

export default SmallRoomList;

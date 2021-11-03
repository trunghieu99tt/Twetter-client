import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

// components
import UserAvatarSmall from "@components/UserAvatarSmall";
import { useUser } from "@talons/useUser";

// types
import { iRoom } from "@type/room.types";
import { iUser } from "@type/user.types";

// icons
import { AiOutlineMessage } from "react-icons/ai";

// states
import { connectedRoomsState } from "states/room.state";

// styles
import {
    Wrapper,
    Heading,
    ChatListWrapper,
    ToggleChatButton,
    ChatUserListItem,
    ChatUserListItemName,
} from "./ChatUserListStyle";

interface Props {}

const ChatUserList = (props: Props) => {
    const { t } = useTranslation();
    const { user: currentUser } = useUser();
    const connectedRooms = useRecoilValue(connectedRoomsState);
    const history = useHistory();

    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleOpenChat = () => setIsChatOpen((value) => !value);

    const onGoChat = (roomId: string) => {
        history.push(`/chat/${roomId}`);
    };

    return (
        <Wrapper>
            <ChatListWrapper isOpen={isChatOpen}>
                <Heading>{t("contact")}</Heading>
                {connectedRooms?.map((room: iRoom) => {
                    // 1. if room is DM
                    if (room.isDm) {
                        const user = room.members.find(
                            (u: iUser) => u._id !== currentUser._id
                        );
                        if (user) {
                            return (
                                <ChatUserListItem
                                    key={`chat-user-list-item-${user._id}`}
                                    onClick={() => onGoChat(room._id)}
                                >
                                    <UserAvatarSmall user={user} />
                                    <ChatUserListItemName>
                                        {user.name}
                                    </ChatUserListItemName>
                                </ChatUserListItem>
                            );
                        }

                        return null;
                    }
                    // 2. TODO:  if room is not DM
                    return null;
                }) || (
                    <p>
                        Seems like you don't have any conversation. Let's make
                        friend and chat more!
                    </p>
                )}
            </ChatListWrapper>
            <ToggleChatButton onClick={toggleOpenChat}>
                <AiOutlineMessage />
            </ToggleChatButton>
            {/* <ChatBoxList>
                {activeChatBoxUsers?.map((user: iUser) => {
                    return (
                        <ChatBox
                            key={`chat-box-${currentUser._id}-${user._id}`}
                            user={user}
                            onClose={() => onRemoveChatBox(user._id)}
                        />
                    );
                })}
            </ChatBoxList> */}
        </Wrapper>
    );
};

export default ChatUserList;

import UserAvatarSmall from "@components/UserAvatarSmall";
import { useUser } from "@talons/useUser";
import { iUser } from "@type/user.types";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { connectedUsersState } from "states/user.state";
import ChatBox from "../ChatBox";
import {
    Wrapper,
    Heading,
    ChatBoxList,
    ChatUserListItem,
    ChatUserListItemName,
} from "./ChatUserListStyle";

interface Props {}

const ChatUserList = (props: Props) => {
    const { user: currentUser } = useUser();
    const connectedUsers = useRecoilValue(connectedUsersState);

    const userLists = connectedUsers?.filter(
        (u: iUser) => u._id !== currentUser._id
    );

    const [activeChatBoxUsers, setActiveChatBoxUsers] = useState<iUser[]>([]);

    const onAddChatBox = (userId: string) => {
        if (!activeChatBoxUsers.some((u: iUser) => u._id === userId)) {
            const user =
                connectedUsers &&
                connectedUsers.find((u: iUser) => u._id === userId);
            if (user) {
                setActiveChatBoxUsers([...activeChatBoxUsers, user]);
            }
        }
    };

    const onRemoveChatBox = (userId: string) => {
        setActiveChatBoxUsers(
            activeChatBoxUsers.filter((u: iUser) => u._id !== userId)
        );
    };

    return (
        <Wrapper>
            <Heading>Contacts</Heading>
            {userLists?.map((user: iUser) => {
                return (
                    <ChatUserListItem
                        key={`chat-user-list-item-${user._id}`}
                        onClick={() => onAddChatBox(user._id)}
                    >
                        <UserAvatarSmall user={user} />
                        <ChatUserListItemName>{user.name}</ChatUserListItemName>
                    </ChatUserListItem>
                );
            })}
            <ChatBoxList>
                {activeChatBoxUsers?.map((user: iUser) => {
                    return (
                        <ChatBox
                            key={`chat-box-${currentUser._id}-${user._id}`}
                            user={user}
                            onClose={() => onRemoveChatBox(user._id)}
                        />
                    );
                })}
            </ChatBoxList>
        </Wrapper>
    );
};

export default ChatUserList;

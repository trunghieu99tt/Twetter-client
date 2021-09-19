import UserAvatarSmall from "@components/UserAvatarSmall";
import { useUser } from "@talons/useUser";
import { iUser } from "@type/user.types";
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

    console.log(`connectedUsers`, connectedUsers);

    const userLists = connectedUsers?.filter(
        (u: iUser) => u._id !== currentUser._id
    );

    return (
        <Wrapper>
            <Heading>Contacts</Heading>
            {userLists?.map((user: iUser) => {
                return (
                    <ChatUserListItem key={`chat-user-list-item-${user._id}`}>
                        <UserAvatarSmall user={user} />
                        <ChatUserListItemName>{user.name}</ChatUserListItemName>
                    </ChatUserListItem>
                );
            })}
            <ChatBoxList>
                {userLists?.map((user: iUser) => {
                    return <ChatBox user={user} key={Math.random()} />;
                })}
            </ChatBoxList>
        </Wrapper>
    );
};

export default ChatUserList;

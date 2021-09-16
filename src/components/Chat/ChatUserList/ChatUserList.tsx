import UserAvatarSmall from "@components/UserAvatarSmall";
import { useUser } from "@talons/useUser";
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
    const { user } = useUser();

    return (
        <Wrapper>
            <Heading>Contacts</Heading>
            {[...Array(10)].map(() => {
                return (
                    <ChatUserListItem>
                        <UserAvatarSmall user={user} />
                        <ChatUserListItemName>{user.name}</ChatUserListItemName>
                    </ChatUserListItem>
                );
            })}
            <ChatBoxList>
                {[...Array(3)].map(() => {
                    return <ChatBox />;
                })}
            </ChatBoxList>
        </Wrapper>
    );
};

export default ChatUserList;

// talons
import { useChatBox } from "./useChatbox";

// components
import TextMessageForm from "./MessageForm/TextMessageForm";

// icons
import { ImCancelCircle } from "react-icons/im";

// types
import { iUser } from "@type/user.types";

import {
    Main,
    Header,
    Wrapper,
    UserInfo,
    UserName,
    UserAvatar,
    MessageForm,
    MessageListWrapper,
} from "./ChatBoxStyle";

type Props = {
    user: iUser;
    onClose: () => void;
};

const ChatBox = ({ user, onClose }: Props) => {
    const { message, onSubmit, setChosenEmoji, setMessage, onChange } =
        useChatBox();

    return (
        <Wrapper>
            <Header>
                <UserInfo>
                    <UserAvatar src={user.avatar} />
                    <UserName>{user.name}</UserName>
                </UserInfo>
                <button onClick={onClose}>
                    <ImCancelCircle />
                </button>
            </Header>
            <Main>
                <MessageListWrapper></MessageListWrapper>
                <MessageForm>
                    <TextMessageForm
                        onChange={onChange}
                        setMessage={setMessage}
                        onSubmit={onSubmit}
                        setChosenEmoji={setChosenEmoji}
                        value={message}
                    />
                </MessageForm>
            </Main>
        </Wrapper>
    );
};

export default ChatBox;

// talons
import { useUser } from "@talons/useUser";

// components
import Message from "./Message";
import TextMessageForm from "./MessageForm/TextMessageForm";

import {
    Main,
    Header,
    Wrapper,
    UserName,
    UserAvatar,
    MessageForm,
    MessageListWrapper,
} from "./ChatBoxStyle";
import { useChatBox } from "./useChatbox";
import { iUser } from "@type/user.types";

type Props = {
    user: iUser;
};

const ChatBox = ({ user }: Props) => {
    const { user: currentUser } = useUser();
    const { message, onSubmit, setChosenEmoji, setMessage, onChange } =
        useChatBox();

    return (
        <Wrapper>
            <Header>
                <UserAvatar src={user.avatar} />
                <UserName>{user.name}</UserName>
            </Header>
            <Main>
                <MessageListWrapper>
                    {[...Array(10)].map(() => {
                        return <Message key={`message-${Math.random()}`} />;
                    })}
                </MessageListWrapper>
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

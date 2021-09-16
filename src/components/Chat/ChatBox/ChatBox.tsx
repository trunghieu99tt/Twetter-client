import { useUser } from "@talons/useUser";
import React from "react";

import { Wrapper, Header, Main, UserName, UserAvatar } from "./ChatBoxStyle";

interface Props {}

const ChatBox = (props: Props) => {
    const { user } = useUser();
    return (
        <Wrapper>
            <Header>
                <UserAvatar src={user.avatar} />
                <UserName>{user.name}</UserName>
            </Header>
            <Main>
                <input type="text" name="message"></input>
            </Main>
        </Wrapper>
    );
};

export default ChatBox;

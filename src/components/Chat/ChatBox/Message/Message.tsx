import UserAvatarSmall from "@components/UserAvatarSmall";
import { useUser } from "@talons/useUser";

import { Wrapper, Content } from "./MessageStyle";

interface Props {}

const Message = (props: Props) => {
    const { user } = useUser();

    const isAuthor = Math.random() < 0.5;

    return (
        <Wrapper isAuthor={isAuthor}>
            <UserAvatarSmall
                user={user}
                customStyles="
                border-radius: 50%;
                border-radius: 50%;
                flex-shrink: 0;
                --size: 3rem;"
            />
            <Content>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                quibusdam est ut ipsam vero odit perferendis, modi nostrum, qui
                maxime, optio molestiae neque! Dignissimos, vitae aliquid
            </Content>
        </Wrapper>
    );
};

export default Message;

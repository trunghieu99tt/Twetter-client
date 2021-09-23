import React from "react";
import { useRecoilValue } from "recoil";

// talons
import { useUser } from "@talons/useUser";

// components
import Logo from "@components/Logo";
import UserAvatarSmall from "@components/UserAvatarSmall";

// states
import { connectedUsersState } from "states/user.state";

// types
import { iUser } from "@type/user.types";

// styles
import classes from "./chatUserList.module.css";

interface Props {}

const ChatPageUserList = (props: Props) => {
    const connectedUser = useRecoilValue(connectedUsersState);
    const { user: currentUser } = useUser();

    const userList = connectedUser?.filter(
        (user: iUser) => currentUser._id !== user._id
    );

    return (
        <div className={classes.root}>
            <div className={classes.logo}>
                <Logo />
            </div>

            {userList?.map((user: iUser) => {
                return (
                    <article className={classes.item}>
                        <UserAvatarSmall
                            user={user}
                            customStyles="--size: 5.6rem; border-radius: 50%;"
                        />
                        <div>
                            <div className={classes.name}>{user.name}</div>
                            <div className={classes.lastMessage}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default ChatPageUserList;

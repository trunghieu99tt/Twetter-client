import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useQueryClient, UseInfiniteQueryResult } from "react-query";

// talons
import { useUser } from "@talons/useUser";

// components
import Logo from "@components/Logo";
import UserAvatarSmall from "@components/UserAvatarSmall";

// states
import { connectedRoomsState } from "states/room.state";

// types
import { iUser } from "@type/user.types";
import { iRoom } from "@type/room.types";

// styles
import classes from "./chatUserList.module.css";
import { MESSAGES_QUERIES } from "constants/message.constants";

const ChatPageUserList = () => {
    const connectedRooms = useRecoilValue(connectedRoomsState);
    const { user: currentUser } = useUser();
    const queryClient = useQueryClient();

    const getLatestMessage = (roomId: string) => {
        const queryData: any = queryClient.getQueryData([
            MESSAGES_QUERIES.GET_MESSAGES,
            roomId,
        ]);

        const data = queryData?.pages?.[0]?.data?.[0];

        return data || {};
    };

    return (
        <div className={classes.root}>
            <div className={classes.logo}>
                <Logo />
            </div>

            {connectedRooms.map((room: iRoom) => {
                // 1. if room is direct message room
                if (room.isDm) {
                    const user = room.members.find((u: iUser) => {
                        return u._id !== currentUser._id;
                    });
                    if (!user) return null;

                    const latestMessage = getLatestMessage(room._id);

                    return (
                        <Link
                            to={`/chat/${room._id}`}
                            key={`chat-page-user-list-${room._id}`}
                        >
                            <article className={classes.item}>
                                <UserAvatarSmall
                                    user={user}
                                    customStyles="--size: 5.6rem; border-radius: 50%;"
                                />
                                <div>
                                    <div className={classes.name}>
                                        {user.name}
                                    </div>
                                    <div className={classes.lastMessage}>
                                        {latestMessage?.content}
                                    </div>
                                </div>
                            </article>
                        </Link>
                    );
                }

                // 2. if room is group room (might be update later)
                else {
                    return null;
                }
            })}
        </div>
    );
};

export default ChatPageUserList;

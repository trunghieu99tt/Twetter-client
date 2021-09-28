import UserAvatarSmall from "@components/UserAvatarSmall";
import { useUser } from "@talons/useUser";
import { iRoom } from "@type/room.types";
import { iUser } from "@type/user.types";
import { useState } from "react";
import { useHistory } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { connectedRoomsState, joinDMRoomState } from "states/room.state";
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
    const setJoinRoomState = useSetRecoilState(joinDMRoomState);
    const connectedRooms = useRecoilValue(connectedRoomsState);
    const connectedUsers = useRecoilValue(connectedUsersState);

    const history = useHistory();

    const userLists = connectedUsers?.filter(
        (u: iUser) => u._id !== currentUser._id
    );

    const [activeChatBoxUsers, setActiveChatBoxUsers] = useState<iUser[]>([]);

    const onRemoveChatBox = (userId: string) => {
        setActiveChatBoxUsers(
            activeChatBoxUsers.filter((u: iUser) => u._id !== userId)
        );
    };

    const onGoChat = (roomId: string) => {
        // const userIds = [currentUser._id, userId].sort();
        // Check if we already has room with these users

        // const room = connectedRooms?.find((room: iRoom) => {
        //     if (room.isDm) {
        //         const roomMembers = room.members
        //             .map((u: iUser) => u._id)
        //             .sort();

        //         return JSON.stringify(roomMembers) === JSON.stringify(userIds);
        //     }

        //     return false;
        // });

        // if (room) {
        history.push(`/chat/${roomId}`);
        // } else {
        //     setJoinRoomState({ userIds });
        // }
    };

    return (
        <Wrapper>
            <Heading>Contacts</Heading>
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

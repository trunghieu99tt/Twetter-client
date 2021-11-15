import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

// talons
import { useUser } from "@talons/useUser";

// components
import UserAvatarSmall from "@components/UserAvatarSmall";

// states
import { connectedRoomsState } from "states/room.state";

// types
import { iUser } from "@type/user.types";
import { iRoom } from "@type/room.types";

// styles
import classes from "./chatUserList.module.css";

const ChatPageUserList = () => {
    const connectedRooms = useRecoilValue(connectedRoomsState);
    const { user: currentUser } = useUser();

    return (
        <div className={classes.root}>
            {connectedRooms.map((room: iRoom) => {
                // 1. if room is direct message room
                if (room.isDm) {
                    const user = room.members.find((u: iUser) => {
                        return u._id !== currentUser._id;
                    });
                    if (!user) return null;

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
                                </div>
                            </article>
                        </Link>
                    );
                }

                // 2. if room is group room (might be update later)
                else {
                    console.log("Go here");
                    const { name, image } = room;

                    console.log("name: ", name);
                    console.log("image: ", image);

                    return (
                        <Link
                            to={`/chat/${room._id}`}
                            key={`chat-page-user-list-${room._id}`}
                        >
                            <article className={classes.item}>
                                <figure>
                                    <img src={image} alt={room.name} />
                                </figure>
                                <div>
                                    <div className={classes.name}>{name}</div>
                                </div>
                            </article>
                        </Link>
                    );
                }
            })}
        </div>
    );
};

export default ChatPageUserList;

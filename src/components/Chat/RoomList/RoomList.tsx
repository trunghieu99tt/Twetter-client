import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

// talons
import { useUser } from "@talons/useUser";

// states
import { connectedRoomsState } from "states/room.state";

// types
import { iUser } from "@type/user.types";
import { iRoom } from "@type/room.types";

// styles
import classes from "./roomList.module.css";
import ImageWithPlaceholder from "@components/ImageWithPlaceholder";

const RoomItem = ({
  name,
  image,
  id,
}: {
  name: string;
  image: string;
  id: string;
}) => {
  return (
    <Link to={`/chat/${id}`} key={`room-item-${id}`}>
      <article className={classes.item}>
        <figure>
          <ImageWithPlaceholder alt={name} src={image} />
        </figure>
        <div>
          <div className={classes.name}>{name}</div>
        </div>
      </article>
    </Link>
  );
};

const RoomList = () => {
  const connectedRooms = useRecoilValue(connectedRoomsState);
  const { user: currentUser } = useUser();

  return (
    <div className={classes.root}>
      {connectedRooms?.map((room: iRoom) => {
        // 1. if room is direct message room
        if (room.isDm) {
          const guestUser = room.members.find((u: iUser) => {
            return u._id !== currentUser._id;
          });
          if (!guestUser) return null;

          return (
            <RoomItem
              key={`room-item-${room._id}`}
              image={guestUser?.avatar}
              name={guestUser?.name}
              id={room._id}
            />
          );
        }

        // 2. if room is group room (might be update later)
        else {
          const { name, image, members } = room;

          let roomName = name;
          if (!name) {
            // set room name to the first 2 members name and 'and others'
            const memberNames = members.map((member: iUser) => member.name);
            roomName =
              memberNames.slice(0, 2).join(", ") +
              (memberNames.length > 2 ? " and others" : "");
          }

          return (
            <RoomItem
              image={image || ""}
              name={roomName}
              id={room._id}
              key={`room-item-${room._id}`}
            />
          );
        }
      })}
    </div>
  );
};

export default RoomList;

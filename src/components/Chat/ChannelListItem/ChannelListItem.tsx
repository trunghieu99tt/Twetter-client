import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";

// utils
import mergeClasses from "@utils/mergeClasses";

// styles
import defaultClasses from "./channellistitem.module.css";

// images
import defaultRoomImage from "../../static/images/default_room.png";

// types
import { iRoom } from "@type/room.types";
import { iMessage } from "@type/message.types";
import { useUser } from "@talons/useUser";

// states

interface Props {
    data: iRoom;
    classes?: object;
    isSelected: boolean;
    onHover: () => void;
    onLeave: () => void;
}

const ChannelListItem = ({
    classes: propsClasses,
    data,
    isSelected,
    onHover,
}: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const messages =
        [...data.messages].sort((messageA: iMessage, messageB: iMessage) => {
            return (
                new Date(messageB.createdAt).getTime() -
                new Date(messageA.createdAt).getTime()
            );
        }) || [];

    const latestMessage: iMessage | null =
        (messages?.length > 0 && messages[0]) || null;

    return (
        <Link to={`/room/${data._id}`}>
            <motion.article className={classes.root}>
                <figure className={classes.imageContainer}>
                    <img
                        src={data?.image || defaultRoomImage}
                        alt={`${data.name}-${data._id}`}
                        className={classes.image}
                    />
                </figure>
                <div className={classes.info}>
                    <p className={classes.name}>{data.name}</p>
                    <p className={classes.latestMessage}>
                        {latestMessage?.content || ""}
                    </p>
                    {/* {unseenMessageCounter > 0 && (
                        <span className={classes.unseenMessageCounter}>
                            {unseenMessageCounter > 50
                                ? "50+"
                                : unseenMessageCounter}
                        </span>
                    )} */}
                </div>
            </motion.article>
        </Link>
    );
};

export default ChannelListItem;

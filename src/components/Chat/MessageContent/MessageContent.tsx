import React from "react";
import cn from "classnames";
import { SRLWrapper } from "simple-react-lightbox";

// utils
import { urlify } from "@utils/helper";

// components
import VoiceMessageContent from "../VoiceMessageContent";

// styles
import classes from "./messageContent.module.css";

// types
import { iMessage } from "@type/message.types";

interface Props {
    data: iMessage;
    isMyMessage: boolean;
}

const MessageContent = ({ data, isMyMessage }: Props) => {
    const messageDate = new Date(data.createdAt);
    const time = messageDate.toLocaleTimeString("en-US");
    let date = messageDate.toLocaleString().split(",")[0];
    const fullName = data?.author?.name;
    let fileContent = null;

    if (data.file) {
        if (
            process.env.REACT_APP_FIREBASE_PROJECTID &&
            data.file.includes(process.env.REACT_APP_FIREBASE_PROJECTID)
        ) {
            fileContent = <VoiceMessageContent url={data.file} />;
        } else {
            fileContent = (
                <figure>
                    <img
                        className="w-60 h-60 object-cover"
                        src={data?.file || ""}
                        alt={`${fullName}-message`}
                        onLoad={() => {
                            console.log("Loaded");
                        }}
                        onError={() => {
                            console.log("Error");
                        }}
                    />
                </figure>
            );
        }
    }

    return (
        <article
            className={cn(classes.root, {
                [classes.self]: isMyMessage,
            })}
        >
            <figure>
                <img
                    className={classes.image}
                    src={data?.author?.avatar}
                    alt={`${fullName}-avatar`}
                />
            </figure>
            <div className={classes.messageWrapper}>
                <div className={classes.info}>
                    <span className={classes.name}>{`${fullName} `}</span>
                    <span className={classes.time}>
                        {date} at {time}
                    </span>
                </div>
                <p
                    className={classes.content}
                    dangerouslySetInnerHTML={{ __html: urlify(data.content) }}
                ></p>
                {data?.file && (
                    <div className={classes.content}>
                        <SRLWrapper>{fileContent}</SRLWrapper>
                    </div>
                )}
            </div>
        </article>
    );
};

export default MessageContent;

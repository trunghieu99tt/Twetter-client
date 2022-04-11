import React, { useState } from "react";
import cn from "classnames";

// utils
import { urlify } from "@utils/helper";

// components
import VoiceMessageContent from "./VoiceMessageContent";

// styles
import classes from "./messageContent.module.css";

// types
import { iMessage } from "@type/message.types";
import ImageWithPlaceholder from "@components/ImageWithPlaceholder";

interface Props {
  data: iMessage;
  isMyMessage: boolean;
}

const MessageContent = ({ data, isMyMessage }: Props) => {
  const messageDate = new Date(data.createdAt);
  const time = messageDate.toLocaleTimeString("en-US");
  const date = messageDate.toLocaleString().split(",")[0];
  const fullName = data?.author?.name;
  let fileContent = null;
  const [reload, setReload] = useState<number>(0);

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
            key={Math.random()}
            onLoad={() => {
              console.log("Loaded");
            }}
            onError={(error) => {
              console.log("error: ", error);
              console.log("Error");
              if (reload < 5) {
                setReload((r) => r + 1);
              }
            }}
            loading="lazy"
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
        <ImageWithPlaceholder
          alt={`${fullName}-avatar`}
          src={data?.author?.avatar}
          customStyles="
                    --size: 3rem;
                        width: var(--size);
                        height: var(--size);
                        border-radius: 50%;
                        object-fit: cover;"
        />
      </figure>
      <div className={classes.messageWrapper}>
        <div className={classes.info}>
          <span className={classes.name}>{`${fullName} `}</span>
          <span className={classes.time}>
            {date} at {time}
          </span>
        </div>
        {data?.content?.length > 0 && (
          <p
            className={classes.content}
            dangerouslySetInnerHTML={{
              __html: urlify(data.content),
            }}
          ></p>
        )}
        {data?.file && <div className={classes.content}>{fileContent}</div>}
      </div>
    </article>
  );
};

export default MessageContent;

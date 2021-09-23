// utils
import mergeClasses from "@utils/mergeClasses";

// components
import MessageContent from "../MessageContent";

// styles
import defaultClasses from "./messagegroup.module.css";

// types
import { iMessage } from "@type/message.types";

interface Props {
    classes?: object;
    day: string;
    messages: iMessage[];
}

const MessageGroup = ({ classes: propsClasses, day, messages }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <p>{day}</p>
            </div>
            <ul className={classes.messageList}>
                {messages &&
                    Array.from(messages).map((message: iMessage) => {
                        return (
                            <MessageContent
                                data={message}
                                key={message._id}
                                isMyMessage={true}
                            />
                        );
                    })}
            </ul>
        </div>
    );
};

export default MessageGroup;

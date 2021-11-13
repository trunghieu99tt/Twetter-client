import React from "react";
import { Link } from "react-router-dom";

// images
import DefaultUnknownAvatar from "@images/user.png";

// types
import { iComment } from "@type/comments.types";

import classes from "./commentSearchResultCard.module.css";

interface Props {
    data: iComment;
}

const CommentSearchResultCard = ({ data }: Props) => {
    const media = data?.media;
    const isMediaVideo = media?.includes("video");

    return (
        <Link to={`/tweet/${data?.tweet?._id || 0}`} className={classes.root}>
            <header className={classes.header}>
                <img
                    src={data.author.avatar || DefaultUnknownAvatar}
                    alt="avatar"
                    className={classes.authorAvatar}
                />
                <p>{data.author.name}</p>
            </header>
            <main className={classes.main}>
                <p className={classes.content}>
                    {data?.content?.slice(
                        0,
                        Math.min(data.content.length, 100)
                    )}
                </p>

                <div className={classes.media}>
                    {media &&
                        (isMediaVideo ? (
                            <video
                                src={media}
                                controls
                                className={classes.video}
                                autoPlay
                                muted
                            />
                        ) : (
                            <img src={media} alt={`comment media`} />
                        ))}
                </div>
            </main>
        </Link>
    );
};

export default CommentSearchResultCard;

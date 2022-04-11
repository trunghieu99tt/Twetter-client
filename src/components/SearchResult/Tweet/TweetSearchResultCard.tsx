import React from "react";
import { Link } from "react-router-dom";

// images
import DefaultUnknownAvatar from "@images/user.png";

// types
import { iTweet } from "@type/tweet.types";

// styles
import classes from "./tweetSearchResultCard.module.css";

interface Props {
  data: iTweet;
}

const TweetSearchResultCard = ({ data }: Props) => {
  const author = data?.author || {};
  const media = data?.media || [];
  const firstMediaUrl = media[0] || "";
  const isFirstMediaVideo = (firstMediaUrl as any)?.includes("video");

  return (
    <Link to={`/tweet/${data._id}`} className={classes.root}>
      <header className={classes.header}>
        <img
          className={classes.authorAvatar}
          src={author.avatar || DefaultUnknownAvatar}
          alt={`${author.name || "author"} avatar`}
          loading="lazy"
        />
        <p>{author.name || "author"}</p>
      </header>

      <main className={classes.main}>
        <p className={classes.content}>
          {data?.content?.slice(0, Math.min(data.content.length, 100))}
        </p>

        <div className={classes.media}>
          {media?.length > 0 &&
            (isFirstMediaVideo ? (
              <video
                src={firstMediaUrl}
                controls
                className={classes.video}
                autoPlay
                muted
              />
            ) : (
              <img src={firstMediaUrl} alt={`tweet media`} loading="lazy" />
            ))}
        </div>
      </main>
    </Link>
  );
};

export default TweetSearchResultCard;

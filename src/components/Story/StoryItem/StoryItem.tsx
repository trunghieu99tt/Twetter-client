import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useUser } from "@talons/useUser";

import StoryViewer from "../StoryViewer";
// components

// icons
import { GrAdd } from "react-icons/gr";

// types
import { iStory } from "@type/story.types";

// image
import DefaultUnknownAvatar from "@images/user.png";

// styles
import classes from "./storyItem.module.css";
import React from "react";

interface Props {
    data?: iStory;
    userId?: string;
    isSmall?: boolean;
}

const StoryItem = ({ data, isSmall, userId }: Props) => {
    const { t } = useTranslation();

    const { user } = useUser();
    const history = useHistory();

    const onClick = () => {
        if (userId) {
            history.push(`/stories/view/${userId}`);
        }
    };

    const ownerName = data?.owner?.name || "";
    const ownerAvatar = data?.owner?.avatar || "";

    return (
        <article className={classes.root} onClick={onClick}>
            {(!data && (
                <Link to="/stories/create">
                    <figure className={classes.imageWrapper}>
                        <img
                            src={user?.avatar || DefaultUnknownAvatar}
                            alt={user?.name}
                            className={classes.userAvatar}
                        />
                    </figure>
                    <div className={classes.addItemPlaceHolder}>
                        <div className={classes.addIcon}>
                            <GrAdd />
                        </div>
                        <p>{t("createStory")}</p>
                    </div>
                </Link>
            )) || (
                <React.Fragment>
                    <StoryViewer data={data!} isSmall={isSmall} />
                    {ownerAvatar && (
                        <figure className={classes.ownerAvatarWrapper}>
                            <img
                                src={ownerAvatar}
                                alt="owner avatar"
                                className={classes.ownerAvatar}
                            />
                        </figure>
                    )}
                    <p className={classes.ownerName}>{ownerName}</p>
                </React.Fragment>
            )}
        </article>
    );
};

export default StoryItem;

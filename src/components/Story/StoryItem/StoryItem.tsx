import React from "react";

import { useUser } from "@talons/useUser";

// icons
import { GrAdd } from "react-icons/gr";

import classes from "./storyItem.module.css";
import { Link } from "react-router-dom";

interface Props {
    isCreate?: boolean;
}

const StoryItem = ({ isCreate = false }: Props) => {
    const { user } = useUser();

    return (
        <article className={classes.root}>
            {isCreate && (
                <Link to="/stories/create">
                    <figure className={classes.imageWrapper}>
                        <img
                            src={user?.avatar}
                            alt={user?.name}
                            className={classes.userAvatar}
                        />
                    </figure>
                    <div className={classes.addItemPlaceHolder}>
                        <div className={classes.addIcon}>
                            <GrAdd />
                        </div>
                        <p>Create story</p>
                    </div>
                </Link>
            )}
        </article>
    );
};

export default StoryItem;

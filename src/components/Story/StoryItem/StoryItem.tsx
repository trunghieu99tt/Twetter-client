import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";

import { useUser } from "@talons/useUser";

import StoryViewer from "../StoryViewer";
// components

// icons
import { GrAdd } from "react-icons/gr";

// states
import { activeUserStoryState } from "states/story.state";

// types
import { iStory } from "@type/story.types";

// styles
import classes from "./storyItem.module.css";

interface Props {
    data?: iStory;
    userId?: string;
    isSmall?: boolean;
}

const StoryItem = ({ data, isSmall, userId }: Props) => {
    const { user } = useUser();
    const history = useHistory();

    const setActiveUserStory = useSetRecoilState(activeUserStoryState);

    const onClick = () => {
        if (userId) {
            history.push("/stories/view");
            setActiveUserStory(userId);
        }
    };

    return (
        <article className={classes.root} onClick={onClick}>
            {(!data && (
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
            )) || <StoryViewer data={data!} isSmall={isSmall} />}
        </article>
    );
};

export default StoryItem;

import { useStory } from "@talons/useStory";
import { iStory } from "@type/story.types";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { storiesState } from "states/story.state";
import StoryItem from "../StoryItem";

import classes from "./storyList.module.css";

const MAX_SHOWN_STORY_COUNT = 5;

const StoryList = () => {
    const groupStoryByUser = useRecoilValue(storiesState);

    return (
        <section className={classes.root}>
            <StoryItem />
            {groupStoryByUser &&
                Object.entries(groupStoryByUser)
                    ?.slice(0, MAX_SHOWN_STORY_COUNT)
                    .map(([key, value]) => (
                        <StoryItem
                            data={value[0]}
                            isSmall={true}
                            userId={key}
                        />
                    ))}
        </section>
    );
};

export default StoryList;

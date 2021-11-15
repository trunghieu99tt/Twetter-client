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
                            key={`story-item-${value[0]._id}`}
                        />
                    ))}
        </section>
    );
};

export default StoryList;

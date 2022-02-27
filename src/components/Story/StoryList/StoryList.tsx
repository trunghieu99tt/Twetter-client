import { useEffect } from "react";
import { useRecoilState } from "recoil";

// talons
import { useStory } from "@talons/useStory";

// utils
import { isEqual } from "lodash";

// components
import StoryItem from "../StoryItem";

// states
import { storiesState } from "states/story.state";

// styles
import classes from "./storyList.module.css";

const MAX_SHOWN_STORY_COUNT = 5;

const StoryList = () => {
    const { getStoriesFeedQuery, groupStoryByUser } = useStory();
    const [stories, setStories] = useRecoilState(storiesState);

    const storyList = getStoriesFeedQuery.data;

    useEffect(() => {
        const newStoriesByUsers = groupStoryByUser(storyList);
        if (!isEqual(stories, newStoriesByUsers)) {
            setStories(newStoriesByUsers);
        }
    }, [storyList]);

    return (
        <section className={classes.root}>
            <StoryItem />
            {stories &&
                Object.entries(stories)
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

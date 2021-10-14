import { useStory } from "@talons/useStory";
import StoryItem from "../StoryItem";

import classes from "./storyList.module.css";

interface Props {}

const StoryList = (props: Props) => {
    const { getStoriesFeedQuery } = useStory();
    const { data } = getStoriesFeedQuery;
    console.log(`data`, data);
    return (
        <section className={classes.root}>
            <StoryItem isCreate={true} />
        </section>
    );
};

export default StoryList;

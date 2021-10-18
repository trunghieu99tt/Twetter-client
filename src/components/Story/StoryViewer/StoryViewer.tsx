import React from "react";

// components
import TextStoryViewer from "./Text/TextStoryViewer";
import ImageStoryViewer from "./Image/ImageStoryViewer";

// types
import { iStory } from "@type/story.types";

// classes
import classes from "./storyViewer.module.css";

interface Props {
    data: iStory;
    isSmall?: boolean;
}

const StoryViewer = ({ data, isSmall }: Props) => {
    const contentData = JSON.parse(data.content);

    const additionalClasses = {
        canvas: classes.full,
        root: classes.full,
        text: classes.smallText,
    };

    if (data.type === "TEXT")
        return (
            <TextStoryViewer data={contentData} classes={additionalClasses} />
        );
    return <ImageStoryViewer data={contentData} classes={additionalClasses} />;
};

export default StoryViewer;

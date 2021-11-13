import React from "react";

// components
import TextStoryViewer from "./Text/TextStoryViewer";
import ImageStoryViewer from "./Image/ImageStoryViewer";

// types
import { iStory } from "@type/story.types";

interface Props {
    data: iStory;
    isSmall?: boolean;
}

const StoryViewer = ({ data, isSmall }: Props) => {
    const contentData = JSON.parse(data.content);

    if (data.type === "TEXT") return <TextStoryViewer data={contentData} />;
    return <ImageStoryViewer data={contentData} />;
};

export default StoryViewer;

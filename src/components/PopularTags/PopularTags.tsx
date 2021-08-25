// utils
import { nFormatter } from "@utils/helper";

// components
import SidebarBlock from "@components/SidebarBlock";

// styles
import { TagCounter, TagName, TagWrapper } from "./PopularTagsStyle";

interface Props {}

const PopularTags = (props: Props) => {
    const title = "Popular Tags";

    const content = [...Array(6)].map((_, i) => {
        return (
            <TagWrapper>
                <TagName>#programing</TagName>
                <TagCounter>
                    {nFormatter(Math.random() * 1e5)} Tweets
                </TagCounter>
            </TagWrapper>
        );
    });

    return <SidebarBlock title={title} content={content} />;
};

export default PopularTags;

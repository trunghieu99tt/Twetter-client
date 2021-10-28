// utils
import { nFormatter } from "@utils/helper";

// components
import SidebarBlock from "@components/Sidebar/SidebarBlock";

// styles
import { TagCounter, TagName, TagWrapper } from "./PopularTagsStyle";
import { useHashtag } from "@talons/useHashtag";
import { iHashtag } from "@type/hashtag.types";
import { HASHTAG_ROUTES } from "routes/routes";

const PopularTags = () => {
    const { getMostPopularHashtagQuery } = useHashtag();

    const mostPopularHashtags: iHashtag[] =
        getMostPopularHashtagQuery.data || [];

    if (!mostPopularHashtags?.length) return null;

    const title = "Popular Tags";

    const content = mostPopularHashtags.map((hashtag: iHashtag) => {
        const { _id, name, count } = hashtag;

        return (
            <TagWrapper
                key={`popular-tag-${_id}`}
                to={`${HASHTAG_ROUTES.BASE}/${name}`}
            >
                <TagName>#{name}</TagName>
                <TagCounter>
                    {nFormatter(count)} {count > 1 ? "tweets" : "tweet"}
                </TagCounter>
            </TagWrapper>
        );
    });

    return <SidebarBlock title={title} content={content} />;
};

export default PopularTags;

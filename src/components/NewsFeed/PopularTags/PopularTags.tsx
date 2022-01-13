import { useTranslation } from "react-i18next";

// talons
import { useHashtag } from "@talons/useHashtag";

// utils
import { nFormatter } from "@utils/helper";

// components
import SidebarBlock from "@components/Sidebar/SidebarBlock";

// styles
import { TagCounter, TagName, TagWrapper } from "./PopularTagsStyle";
import { iHashtag } from "@type/hashtag.types";
import { HASHTAG_ROUTES } from "routes/routes";

const PopularTags = () => {
    const { t } = useTranslation();

    const { getMostPopularHashtagQuery } = useHashtag();

    const mostPopularHashtags: iHashtag[] =
        getMostPopularHashtagQuery.data || [];

    if (!mostPopularHashtags?.length) return null;

    const title = t("popularTag");

    const content = mostPopularHashtags
        .slice(0, Math.min(mostPopularHashtags.length, 5))
        .map((hashtag: iHashtag) => {
            const { _id, name, count } = hashtag;

            return (
                <TagWrapper
                    key={`popular-tag-${_id}`}
                    to={`${HASHTAG_ROUTES.BASE}/${name}`}
                >
                    <TagName>#{name}</TagName>
                    <TagCounter>
                        {nFormatter(count)}{" "}
                        {`${t("tweet")}${count > 1 ? "s" : ""}`}{" "}
                    </TagCounter>
                </TagWrapper>
            );
        });

    return <SidebarBlock title={title} content={content} />;
};

export default PopularTags;

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// types
import { iHashtag } from "@type/hashtag.types";

// routes
import { HASHTAG_ROUTES } from "routes/routes";

// styles
import classes from "./hashtagSearchResult.module.css";

interface Props {
    data: iHashtag;
}

const HashtagSearchResult = ({ data }: Props) => {
    const { t } = useTranslation();

    return (
        <Link
            to={`${HASHTAG_ROUTES.BASE}/${data.name}`}
            className={classes.root}
        >
            <p className={classes.hashtagName}>#{data.name}</p>
            <p className={classes.count}>
                {" "}
                {t("numberOfTweet")}: <span>{data.count}</span>
            </p>
        </Link>
    );
};

export default HashtagSearchResult;

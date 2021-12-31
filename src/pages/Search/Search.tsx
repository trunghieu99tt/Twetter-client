import React from "react";
import { useTranslation } from "react-i18next";

// talons
import { useSearch } from "./useSearch";

// layout
import MainLayout from "@layout/Main/Main.layout";

// components
import PageMetadata from "@components/PageMetadata";
import HashtagSearchResult from "@components/SearchResult/Hashtag/HashtagSearchResult";
import TweetSearchResultCard from "@components/SearchResult/Tweet/TweetSearchResultCard";
import CommentSearchResultCard from "@components/SearchResult/Comment/CommentSearchResultCard";

// icons
import { AiOutlineFileSearch } from "react-icons/ai";

// types
import { iTweet } from "@type/tweet.types";

// styles
import classes from "./search.module.css";
import { Container } from "@shared/style/sharedStyle.style";
import { iHashtag } from "@type/hashtag.types";
import { iUser } from "@type/user.types";
import UserCard from "@components/UserCard";
import { Spinner1 } from "@components/Loaders";

const Search = () => {
    const { t } = useTranslation();

    const { query, loading, response, onChange, onSubmit } = useSearch();

    let resultContent = null;

    if (response) {
        switch (response.type) {
            case "tweet":
                resultContent = response.data.map((tweet: iTweet) => (
                    <TweetSearchResultCard
                        data={tweet}
                        key={`TweetSearchResultCard-${tweet._id}`}
                    />
                ));
                break;
            // case "comment":
            //     resultContent = response.data
            //         .filter((comment: iComment) => comment.tweet)
            //         .map((comment: iComment) => (
            //             <CommentSearchResultCard
            //                 data={comment}
            //                 key={`CommentSearchResultCard-${comment._id}`}
            //             />
            //         ));

            //     break;
            case "people":
                resultContent = response.data.map((user: iUser) => (
                    <UserCard
                        user={user}
                        key={`UserSearchResultCard-${user._id}`}
                    />
                ));
                break;
            case "hashtag":
                resultContent = response.data.map((hashtag: iHashtag) => (
                    <HashtagSearchResult
                        data={hashtag}
                        key={`HashtagSearchResult-${hashtag._id}`}
                    />
                ));
                break;
        }
    }

    return (
        <React.Fragment>
            <PageMetadata title={t("search")} />
            <Container>
                <div className={classes.root}>
                    <main className={classes.main}>
                        <section className={classes.searchForm}>
                            <input
                                type="text"
                                name="search"
                                onChange={onChange}
                                value={query.search}
                                className={classes.input}
                            />
                            <div className={classes.categoryForm}>
                                <label
                                    htmlFor="category"
                                    className={classes.categoryLabel}
                                >
                                    {t("searchCategory")}
                                </label>

                                <select
                                    name="category"
                                    id="searchCategory"
                                    onChange={onChange}
                                    className={classes.CategorySelections}
                                >
                                    <option value="tweet">{t("tweet")}</option>
                                    {/* <option value="comment">
                                        {t("comment")}
                                    </option> */}
                                    <option value="hashtag">
                                        {t("hashtag")}
                                    </option>
                                    <option value="people">
                                        {t("people")}
                                    </option>
                                </select>
                            </div>
                            <button
                                className={classes.submit}
                                onClick={onSubmit}
                            >
                                <AiOutlineFileSearch />
                                {t("search")}
                            </button>
                        </section>

                        {loading && <Spinner1 />}

                        {response && (
                            <section className={classes.searchResult}>
                                {(response?.data?.length > 0 &&
                                    resultContent) || (
                                    <p className={classes.searchNoResult}>
                                        {t("searchNoResult")}
                                    </p>
                                )}
                            </section>
                        )}
                    </main>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default MainLayout(Search);

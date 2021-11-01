import React from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import nl2br from "react-nl2br";
import reactStringReplace from "react-string-replace";

// talons
import { useTweet } from "./useTweet";

// components
import EditTweet from "../EditTweet";
import Comment from "@components/Comment";
import Dropdown from "@components/Dropdown";
import { Spinner1 } from "@components/Loaders";
import AddComment from "@components/AddComment";
import MediaViewer from "@components/MediaViewer";
import { Carousel } from "react-responsive-carousel";
import UserAvatarSmall from "@components/UserAvatarSmall";

// icons
import { FiRefreshCw } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import {
    AiOutlineEdit,
    AiOutlineDelete,
    AiOutlineRetweet,
} from "react-icons/ai";
import { BiComment, BiBookmark, BiDotsVertical } from "react-icons/bi";

// types
import { TMedia } from "@type/app.types";
import { iTweet } from "@type/tweet.types";
import { iComment } from "@type/comments.types";

// styles
import {
    Header,
    Wrapper,
    Content,
    TweetMedia,
    AuthorName,
    DateCreated,
    RetweetedBy,
    Interaction,
    AuthorAction,
    AuthorWrapper,
    AuthorActions,
    DropdownButton,
    CommentsWrapper,
    TweetDescription,
    TweetMediaWrapper,
    InteractionButton,
    InteractionSummary,
    InteractionSummaryItem,
    InteractionButtonGroup,
} from "./TweetStyle";
import { calcDiffTimeString, stopPropagation } from "@utils/helper";
import CustomLinkPreview from "@components/CustomLinkPreview";
import { HASHTAG_ROUTES } from "routes/routes";

type Props = {
    tweet: iTweet;
};

const Tweet = ({ tweet }: Props) => {
    const {
        urls,
        liked,
        saved,
        isAuthor,
        retweeted,
        dropdownRef,
        isRetweeted,
        retweetedBy,
        deleteLoading,
        tweetComments,
        addCommentRef,
        tweetLikeCount,
        tweetSavedCount,
        visibleDropdown,
        visibleEditForm,
        tweetRetweetCount,
        totalTweetComments,

        onRetweet,
        onSaveTweet,
        onReactTweet,
        onDeleteTweet,
        toggleDropdown,
        setVisibleEditForm,
        focusOnCommentForm,
        fetchMoreTweetComment,
    } = useTweet({
        tweet,
    });

    const renderParsedTweet = () => {
        let replacedText;

        replacedText = reactStringReplace(
            nl2br(tweet.content),
            /(https?:\/\/\S+)/g,
            (match, i) => {
                return (
                    <a
                        className="text-primary hover:text-primary_hover"
                        key={match + i}
                        href={match}
                        onClick={stopPropagation}
                        target="_blank"
                        rel="noopener, noreferrer"
                    >
                        {match}
                    </a>
                );
            }
        );
        // Match hashtags
        replacedText = reactStringReplace(
            replacedText,
            /#(\w+)/g,
            (match, i) => (
                <Link
                    className="font-bold hover:text-gray-500 transition-colors duration-300"
                    key={match + i}
                    to={`${HASHTAG_ROUTES.BASE}/${match}`}
                    onClick={stopPropagation}
                >
                    #{match}
                </Link>
            )
        );
        return replacedText;
    };

    return (
        <React.Fragment>
            {visibleEditForm && (
                <EditTweet
                    tweet={tweet}
                    onCancel={() => setVisibleEditForm(false)}
                />
            )}
            {isRetweeted && retweetedBy && (
                <RetweetedBy to={`/profile/${retweetedBy._id}`}>
                    <AiOutlineRetweet /> {`${retweetedBy.name} retweeted`}
                </RetweetedBy>
            )}
            <Wrapper>
                {deleteLoading && <Spinner1 />}

                <Header>
                    <AuthorWrapper>
                        <Link to={`/profile/${tweet.author._id}`}>
                            <UserAvatarSmall user={tweet?.author} />
                        </Link>
                        <div>
                            <Link to={`/profile/${tweet.author._id}`}>
                                <AuthorName>{tweet.author.name}</AuthorName>
                            </Link>
                            <DateCreated>
                                {calcDiffTimeString(tweet?.createdAt)}
                            </DateCreated>
                        </div>
                    </AuthorWrapper>
                    {isAuthor && (
                        <AuthorActions ref={dropdownRef}>
                            <DropdownButton onClick={toggleDropdown}>
                                <BiDotsVertical />
                            </DropdownButton>
                            <Dropdown
                                isVisible={visibleDropdown}
                                items={[
                                    <AuthorAction
                                        onClick={() => setVisibleEditForm(true)}
                                    >
                                        <AiOutlineEdit />
                                        Edit
                                    </AuthorAction>,
                                    <AuthorAction onClick={onDeleteTweet}>
                                        <AiOutlineDelete />
                                        Delete
                                    </AuthorAction>,
                                ]}
                            ></Dropdown>
                        </AuthorActions>
                    )}
                </Header>
                <Content>
                    {tweet?.content && (
                        <TweetDescription>
                            {renderParsedTweet()}
                        </TweetDescription>
                    )}

                    {urls && urls?.length > 0 && !tweet?.media?.length && (
                        <CustomLinkPreview url={urls[0]} />
                    )}

                    {tweet?.media?.length > 0 && (
                        <TweetMediaWrapper>
                            <Carousel
                                showArrows={false}
                                showIndicators={tweet?.media?.length > 1}
                                showStatus={tweet?.media?.length > 1}
                                showThumbs={false}
                            >
                                {tweet.media.map(
                                    (url: string, index: number) => {
                                        const mediaData: TMedia = {
                                            url: url,
                                            type: url.includes("video")
                                                ? "video"
                                                : "image",
                                            id: v4(),
                                        };

                                        return (
                                            <TweetMedia
                                                key={`tweet-media-${mediaData.id}`}
                                            >
                                                <MediaViewer
                                                    media={mediaData}
                                                />
                                            </TweetMedia>
                                        );
                                    }
                                )}
                            </Carousel>
                        </TweetMediaWrapper>
                    )}

                    <Interaction>
                        <InteractionSummary>
                            <InteractionSummaryItem>
                                {tweetLikeCount}
                                {tweetLikeCount <= 1 ? " like" : " likes"}
                            </InteractionSummaryItem>
                            <InteractionSummaryItem>
                                {totalTweetComments}
                                {totalTweetComments <= 1
                                    ? " comment"
                                    : " comments"}
                            </InteractionSummaryItem>
                            <InteractionSummaryItem>
                                {tweetRetweetCount} retweeted
                            </InteractionSummaryItem>
                            <InteractionSummaryItem>
                                {tweetSavedCount} saved
                            </InteractionSummaryItem>
                        </InteractionSummary>

                        <InteractionButtonGroup>
                            <InteractionButton onClick={focusOnCommentForm}>
                                <BiComment />
                                Comment
                            </InteractionButton>
                            <InteractionButton
                                onClick={onRetweet}
                                retweeted={retweeted}
                            >
                                <FiRefreshCw />
                                Retweet
                            </InteractionButton>
                            <InteractionButton
                                onClick={onReactTweet}
                                liked={liked}
                            >
                                <FaRegHeart />
                                {liked ? "Liked" : "Like"}
                            </InteractionButton>
                            <InteractionButton
                                onClick={onSaveTweet}
                                saved={saved}
                            >
                                <BiBookmark />
                                {saved ? "Saved" : "Save"}
                            </InteractionButton>
                        </InteractionButtonGroup>
                    </Interaction>
                </Content>
                <AddComment addCommentRef={addCommentRef} tweetId={tweet._id} />
                <CommentsWrapper>
                    {tweetComments?.map((comment: iComment) => {
                        return <Comment data={comment} key={comment._id} />;
                    })}
                    {totalTweetComments > tweetComments.length && (
                        <button onClick={() => fetchMoreTweetComment()}>
                            Load more comments
                        </button>
                    )}
                </CommentsWrapper>
            </Wrapper>
        </React.Fragment>
    );
};

export default Tweet;

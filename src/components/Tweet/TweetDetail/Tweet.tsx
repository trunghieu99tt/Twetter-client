import React from "react";
import { Link } from "react-router-dom";

// talons
import { useTweet } from "./useTweet";

// components
import Comment from "@components/Comment";
import Dropdown from "@components/Dropdown";
import { Spinner1 } from "@components/Loaders";
import AddComment from "@components/AddComment";
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
import { iTweet } from "@type/tweet.types";

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

// types and constants
import { iComment } from "@type/comments.types";
import EditTweet from "../EditTweet";
import RichTextInput from "@components/RichTextInput";
import { convertFromRaw, EditorState } from "draft-js";

type Props = {
    tweet: iTweet;
};

const Tweet = ({ tweet }: Props) => {
    const {
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
                                {new Date(tweet.createdAt).toLocaleString(
                                    "en-US"
                                )}
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
                            <RichTextInput
                                data={EditorState.createWithContent(
                                    convertFromRaw(
                                        JSON.parse(tweet.content || "{}")
                                    )
                                )}
                            />
                        </TweetDescription>
                    )}

                    {tweet?.media?.length > 0 && (
                        <TweetMediaWrapper>
                            <Carousel
                                showArrows={false}
                                showIndicators={tweet?.media?.length > 1}
                                showStatus={tweet?.media?.length > 1}
                                showThumbs={false}
                            >
                                {tweet.media.map((media, index) => (
                                    <TweetMedia key={index} src={media} />
                                ))}
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

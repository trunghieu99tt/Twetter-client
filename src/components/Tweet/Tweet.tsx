import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

// talons
import { useQueryClient } from "react-query";
import { useTweets } from "@talons/useTweets";

// hooks
import { useOnClickOutside } from "@hooks/useOnClickOutside";

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
import { AiOutlineDelete, AiOutlineRetweet } from "react-icons/ai";
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
    TweetDescription,
    TweetMediaWrapper,
    InteractionButton,
    InteractionSummary,
    InteractionSummaryItem,
    InteractionButtonGroup,
    CommentsWrapper,
} from "./TweetStyle";

// types and constants
import { iUser } from "@type/user.types";
import { USER_QUERY } from "constants/user.constants";
import { useComment } from "@talons/useComment";
import { iComment } from "@type/comments.types";

type Props = {
    tweet: iTweet;
};

const Tweet = ({ tweet }: Props) => {
    const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);
    const currentUser: iUser | undefined = useQueryClient().getQueryData(
        USER_QUERY.GET_ME
    );
    const {
        deleteTweetMutation,
        reactTweetMutation,
        retweetMutation,
        saveTweetMutation,
    } = useTweets();
    const { tweetComments, totalTweetComments, fetchMoreTweetComment } =
        useComment({
            tweetId: tweet._id,
            userId: currentUser?.id,
        });

    const dropdownRef = useRef() as React.RefObject<HTMLDivElement>;
    const addCommentRef = useRef(null) as React.RefObject<HTMLInputElement>;

    const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

    const onDeleteTweet = () => {
        deleteTweetMutation.mutate(tweet._id);
    };

    const onReactTweet = () => {
        reactTweetMutation.mutate({ tweetId: tweet._id });
    };

    const onRetweet = () => {
        retweetMutation.mutate(tweet._id);
    };

    const onSaveTweet = () => {
        saveTweetMutation.mutate(tweet._id);
    };

    useOnClickOutside(dropdownRef, () => setVisibleDropdown(false));

    const onClickComment = () => {
        if (addCommentRef?.current) {
            addCommentRef.current.focus();
        }
    };

    const isAuthor =
        (currentUser && tweet?.author?._id === currentUser?._id) ||
        (currentUser && tweet?.retweetedBy?._id === currentUser?._id);
    const isRetweeted = tweet.isRetweet;
    const liked =
        (currentUser?._id && tweet.likes.includes(currentUser?._id)) || false;
    const saved =
        (currentUser?._id && tweet?.saved?.includes(currentUser._id)) || false;
    const retweetedBy = tweet?.retweetedBy;
    const retweeted =
        (currentUser?._id && tweet?.retweeted?.includes(currentUser._id)) ||
        false;
    const tweetLikeCount = tweet?.likes?.length || 0;
    const tweetSavedCount = tweet?.saved?.length || 0;
    const tweetRetweetCount = tweet?.retweeted?.length || 0;

    return (
        <React.Fragment>
            {isRetweeted && retweetedBy && (
                <RetweetedBy to={`/profile/${retweetedBy._id}`}>
                    <AiOutlineRetweet /> {`${retweetedBy.name} retweeted`}
                </RetweetedBy>
            )}
            <Wrapper>
                {deleteTweetMutation.isLoading && <Spinner1 />}

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
                    <TweetDescription>{tweet.content}</TweetDescription>
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
                            <InteractionButton onClick={onClickComment}>
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

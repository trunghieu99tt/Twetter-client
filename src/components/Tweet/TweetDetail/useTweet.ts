import { useRef, useState } from "react";
import { useQueryClient } from "react-query";

// hooks
import { useOnClickOutside } from "@hooks/useOnClickOutside";

// talons
import { useNotify } from "@talons/useNotify";
import { useTweets } from "@talons/useTweets";
import { useComment } from "@talons/useComment";

// types
import { iTweet } from "@type/tweet.types";
import { iUser } from "@type/user.types";

// constants
import { USER_QUERY } from "constants/user.constants";
import { useAppContext } from "@context/app.context";
import { iNotificationDTO } from "@type/notify.types";


type Props = {
    tweet: iTweet;
};

export const useTweet = ({ tweet }: Props) => {
    const [visibleEditForm, setVisibleEditForm] = useState<boolean>(false);
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
    const { createNotificationAction } = useNotify();

    const { tweetComments, totalTweetComments, fetchMoreTweetComment } =
        useComment({
            tweetId: tweet._id,
            userId: currentUser?._id,
        });

    const { state: {
        socket
    } } = useAppContext();


    const dropdownRef = useRef() as React.RefObject<HTMLDivElement>;
    const addCommentRef = useRef(null) as React.RefObject<HTMLInputElement>;

    // check if current user is author of tweet
    const isAuthor =
        (currentUser && tweet?.author?._id === currentUser?._id) ||
        (currentUser && tweet?.retweetedBy?._id === currentUser?._id);

    // check if this tweet is retweeted from another tweet
    const isRetweeted = tweet.isRetweet;

    // current user liked this tweet or not
    const liked =
        (currentUser?._id && tweet.likes.includes(currentUser?._id)) || false;

    // current user saved this tweet or not
    const saved =
        (currentUser?._id && tweet?.saved?.includes(currentUser._id)) || false;

    // get who retweeted this tweet
    const retweetedBy = tweet?.retweetedBy;

    // current user retweeted this tweet or not
    const retweeted =
        (currentUser?._id && tweet?.retweeted?.includes(currentUser._id)) ||
        false;

    // interaction counters
    const tweetLikeCount = tweet?.likes?.length || 0;
    const tweetSavedCount = tweet?.saved?.length || 0;
    const tweetRetweetCount = tweet?.retweeted?.length || 0;

    // loading states
    const deleteLoading = deleteTweetMutation.isLoading;

    const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

    const onDeleteTweet = () => {
        deleteTweetMutation.mutate(tweet._id);
    };

    const onReactTweet = () => {
        reactTweetMutation.mutate(tweet._id);
        if (!liked) {

            const msg: iNotificationDTO = {
                text: `liked your tweet`,
                receivers: [tweet.author._id],
                url: `/tweet/${tweet._id}`,
                type: 'like',
            };

            createNotificationAction(msg);
        }
    };

    const onRetweet = () => {
        retweetMutation.mutate(tweet._id);
        if (!retweeted) {
            socket?.emit("tweet-interaction", {
                tweetId: tweet._id,
                userId: currentUser?._id,
                action: 'retweet',
            });
        }
    };

    const onSaveTweet = () => {
        saveTweetMutation.mutate(tweet._id);
        if (!saved) {
            socket?.emit("tweet-interaction", {
                tweetId: tweet._id,
                userId: currentUser?._id,
                action: 'save',
            });
        }
    };

    useOnClickOutside(dropdownRef, () => setVisibleDropdown(false));

    const focusOnCommentForm = () => {
        if (addCommentRef?.current) {
            addCommentRef.current.focus();
        }
    };

    return {
        liked,
        saved,
        isAuthor,
        retweeted,
        dropdownRef,
        isRetweeted,
        retweetedBy,
        tweetComments,
        addCommentRef,
        deleteLoading,
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
    };

};
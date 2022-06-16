import { useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { Modal } from "antd";

// hooks
import { useOnClickOutside } from "@hooks/useOnClickOutside";

// talons
import { useNotify } from "@talons/useNotify";
import { useTweets } from "@talons/useTweets";
import { useComment } from "@talons/useComment";
import { useHashtag } from "@talons/useHashtag";

// utils
import { extractMetadata } from "@utils/helper";

// types
import { iUser } from "@type/user.types";
import { iTweet } from "@type/tweet.types";
import { iNotificationDTO } from "@type/notify.types";

// constants
import { USER_QUERY } from "constants/user.constants";
import { useReport } from "@talons/useReport";
import { useHistory, useParams } from "react-router";

type Props = {
  tweet: iTweet;
};

type TUserList = "LIKED" | "SAVED" | "RETWEETED";

const { confirm } = Modal;

export const useTweet = ({ tweet }: Props) => {
  const { t } = useTranslation();
  const params = useParams();
  const history = useHistory();
  const [urls, setUrls] = useState<string[]>([]);
  const [modalUserList, setModalUserList] = useState<TUserList | null>();
  const [visibleEditForm, setVisibleEditForm] = useState<boolean>(false);
  const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);
  const currentUser: iUser | undefined = useQueryClient().getQueryData(
    USER_QUERY.GET_ME
  );

  const {
    retweetMutation,
    deleteTweetMutation,
    reactTweetMutation,
    saveTweetMutation,
    reportTweetMutation,
  } = useTweets();
  const { createNotificationAction } = useNotify();
  const { tweetComments, totalTweetComments, fetchMoreTweetComment } =
    useComment({
      tweetId: tweet._id,
      userId: currentUser?._id,
    });
  const { updateHashTags } = useHashtag();
  const { onReport } = useReport("tweet");

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
    (currentUser?._id &&
      tweet.likes.findIndex((u: iUser) => u._id === currentUser?._id) !== -1) ||
    false;

  // current user saved this tweet or not
  const saved =
    (currentUser?._id &&
      tweet?.saved?.findIndex((u: iUser) => u._id === currentUser?._id) !==
        -1) ||
    false;

  // get who retweeted this tweet
  const retweetedBy = tweet?.retweetedBy;

  // current user retweeted this tweet or not
  const retweeted =
    (currentUser?._id &&
      tweet?.retweeted?.findIndex((u: iUser) => u._id === currentUser?._id) !==
        -1) ||
    false;

  // interaction counters
  const tweetLikeCount = tweet?.likes?.length || 0;
  const tweetSavedCount = tweet?.saved?.length || 0;
  const tweetRetweetCount = tweet?.retweeted?.length || 0;

  // loading states
  const deleteLoading = deleteTweetMutation.isLoading;

  const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

  const onDeleteTweet = () => {
    confirm({
      title: t("deleteTweetConfirmation"),
      onOk: () => {
        deleteTweetMutation.mutate(tweet._id, {
          onSuccess: () => {
            const initialTags = tweet?.tags || [];
            updateHashTags(initialTags, []);
            if ((params as any)?.tweetId) {
              history.push("/");
            }
          },
        });
      },
    });
  };

  const onReactTweet = () => {
    reactTweetMutation.mutate(tweet._id);
    if (!liked) {
      if (currentUser) {
        tweet.likes.push(currentUser as iUser);
      }
      const msg: iNotificationDTO = {
        text: "likedYourTweet",
        receivers: [tweet.author._id],
        url: `/tweet/${tweet._id}`,
        type: "like",
      };

      createNotificationAction(msg);
    }
  };

  const onRetweet = () => {
    retweetMutation.mutate(tweet._id);
    if (!retweeted) {
      if (currentUser) {
        tweet.retweeted.push(currentUser as iUser);
      }
      const msg: iNotificationDTO = {
        text: "retweetedYourTweet",
        receivers: [tweet.author._id],
        url: `/tweet/${tweet._id}`,
        type: "retweet",
      };

      createNotificationAction(msg);
    }
  };

  const onSaveTweet = () => {
    saveTweetMutation.mutate(tweet._id);
    if (!saved) {
      if (currentUser) {
        tweet.saved.push(currentUser as iUser);
      }
      const msg: iNotificationDTO = {
        text: "savedYourTweet",
        receivers: [tweet.author._id],
        url: `/tweet/${tweet._id}`,
        type: "save",
      };

      createNotificationAction(msg);
    }
  };

  useOnClickOutside(dropdownRef, () => setVisibleDropdown(false));

  const focusOnCommentForm = () => {
    if (addCommentRef?.current) {
      addCommentRef.current.focus();
    }
  };

  const updateUrls = (content: string) => {
    const { urls } = extractMetadata(content);
    if (urls && urls?.length > 0) {
      setUrls(urls);
    }
  };

  const onCloseModalUserList = () => setModalUserList(null);

  const onReportTweet = () => {
    const callback = () => reportTweetMutation.mutate(tweet._id);
    if (currentUser?._id) {
      onReport(tweet._id, currentUser?._id, callback);
    }
  };

  useEffect(() => {
    if (tweet?.content) {
      updateUrls(tweet.content);
    }
  }, [tweet]);

  return {
    urls,
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
    modalUserList,
    tweetLikeCount,
    tweetSavedCount,
    visibleDropdown,
    visibleEditForm,
    tweetRetweetCount,
    totalTweetComments,

    setUrls,
    onRetweet,
    onSaveTweet,
    onReactTweet,
    onReportTweet,
    onDeleteTweet,
    toggleDropdown,
    setModalUserList,
    setVisibleEditForm,
    focusOnCommentForm,
    onCloseModalUserList,
    fetchMoreTweetComment,
  };
};

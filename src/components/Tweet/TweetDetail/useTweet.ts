import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { Modal } from "antd";

// hooks
import { useLocalStorage } from "@hooks/useLocalStorage";
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
import { iTweet, iTweetReport } from "@type/tweet.types";
import { iNotificationDTO } from "@type/notify.types";

// constants
import { USER_QUERY } from "constants/user.constants";
import { FIVE_MINUTES } from "constants/app.constants";

type Props = {
    tweet: iTweet;
};

type TUserList = "LIKED" | "SAVED" | "RETWEETED";

const { confirm } = Modal;

export const useTweet = ({ tweet }: Props) => {
    const { t } = useTranslation();
    const [urls, setUrls] = useState<string[]>([]);
    const [modalUserList, setModalUserList] = useState<TUserList | null>();
    const [visibleEditForm, setVisibleEditForm] = useState<boolean>(false);
    const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);

    const [reports, setReports] = useLocalStorage("reports", {});
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
            tweet.likes.findIndex((u: iUser) => u._id === currentUser?._id) !==
                -1) ||
        false;

    // current user saved this tweet or not
    const saved =
        (currentUser?._id &&
            tweet?.saved?.findIndex(
                (u: iUser) => u._id === currentUser?._id
            ) !== -1) ||
        false;

    // get who retweeted this tweet
    const retweetedBy = tweet?.retweetedBy;

    // current user retweeted this tweet or not
    const retweeted =
        (currentUser?._id &&
            tweet?.retweeted?.findIndex(
                (u: iUser) => u._id === currentUser?._id
            ) !== -1) ||
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
                    },
                });
            },
        });
    };

    const onReactTweet = () => {
        reactTweetMutation.mutate(tweet._id);
        if (!liked) {
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

    const findReportRecord = (): iTweetReport | null => {
        if (tweet?._id) {
            const tweetReports = reports[tweet?._id] || [];
            return tweetReports.find(
                (report: iTweetReport) => report.userId === currentUser?._id
            );
        }

        return null;
    };

    const updateUserLastTimeReportedCurrentTweet = () => {
        const tweetReports = reports[tweet._id] || [];
        let newTweetReports = [...tweetReports];
        if (tweetReports?.length === 0) {
            newTweetReports.push({
                userId: currentUser?._id,
                reportTime: new Date().toISOString(),
            });
        } else if (tweetReports?.length > 0) {
            newTweetReports = tweetReports.map((report: iTweetReport) => {
                if (report.userId === currentUser?._id) {
                    return {
                        ...report,
                        reportTime: new Date().toISOString(),
                    };
                }
                return report;
            });
        }
        reports[tweet._id] = newTweetReports;
        setReports(reports);
    };

    const onReportTweet = () => {
        const userReportTweetRecord = findReportRecord();
        if (userReportTweetRecord) {
            const lastTimeReported = userReportTweetRecord.reportTime;
            // if user reported this tweet in last 5 minutes, show error
            if (
                +Date.now() - new Date(lastTimeReported).getTime() <
                FIVE_MINUTES
            ) {
                toast.error(t("reportRestriction"));
                return;
            }
        } else {
            reportTweetMutation.mutate(tweet._id, {
                onSuccess: () => {
                    toast.info(t("reportSuccess"));
                    // update last time reported in local storage
                    updateUserLastTimeReportedCurrentTweet();
                },
            });
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

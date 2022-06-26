import AddCommentForm from "@components/CommentForm";
import Comment from "@components/Comment";
import CustomLinkPreview from "@components/CustomLinkPreview";
import Dropdown from "@components/Dropdown";
import { Spinner1 } from "@components/Loaders";
import MediaViewer from "@components/MediaViewer";
import UserAvatarSmall from "@components/UserAvatarSmall";
import UserCard from "@components/UserCard";
import { TMedia } from "@type/app.types";
import { iComment } from "@type/comments.types";
import { iTweet } from "@type/tweet.types";
import { iUser } from "@type/user.types";
import { calcDiffTimeString, stopPropagation } from "@utils/helper";
import React, { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineRetweet,
} from "react-icons/ai";
import { BiBookmark, BiComment, BiDotsVertical } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { MdReportProblem } from "react-icons/md";
import nl2br from "react-nl2br";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import { HASHTAG_ROUTES } from "routes/routes";
import { v4 } from "uuid";

import {
  AuthorAction,
  AuthorActions,
  AuthorName,
  AuthorWrapper,
  CommentsWrapper,
  Content,
  DateCreated,
  DropdownButton,
  Header,
  Interaction,
  InteractionButton,
  InteractionButtonGroup,
  InteractionSummary,
  InteractionSummaryItem,
  RetweetedBy,
  TweetDescription,
  TweetMedia,
  TweetMediaWrapper,
  Wrapper,
} from "./TweetStyle";
import { useTweet } from "./useTweet";
const EditTweet = lazy(() => import("../EditTweet"));
const Modal = lazy(() => import("@components/Modal"));

type Props = {
  tweet: iTweet;
};

const Tweet = ({ tweet }: Props): JSX.Element => {
  const { t } = useTranslation();
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
    modalUserList,
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
    onReportTweet,
    onDeleteTweet,
    toggleDropdown,
    setModalUserList,
    setVisibleEditForm,
    focusOnCommentForm,
    onCloseModalUserList,
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
    replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
      <Link
        className="font-bold hover:text-gray-500 transition-colors duration-300"
        key={match + i}
        to={`${HASHTAG_ROUTES.BASE}/${match}`}
        onClick={stopPropagation}
      >
        #{match}
      </Link>
    ));
    return replacedText;
  };

  let userListData: iUser[] = [];
  let modalUserListHeader = "";

  switch (modalUserList) {
    case "LIKED":
      userListData = tweet?.likes || [];
      modalUserListHeader = t("userLikedTweet");
      break;
    case "SAVED":
      userListData = tweet?.saved || [];
      modalUserListHeader = t("userSavedTweet");
      break;
    case "RETWEETED":
      userListData = tweet?.retweeted || [];
      modalUserListHeader = t("userRetweetedTweet");
      break;
  }

  const userList = userListData.map((user: iUser) => <UserCard user={user} />);

  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <Modal
          body={userList}
          header={modalUserListHeader}
          isOpen={!!modalUserList}
          onCancel={onCloseModalUserList}
        />
      </Suspense>
      {visibleEditForm && (
        <Suspense fallback={<div>Loading...</div>}>
          <EditTweet tweet={tweet} onCancel={() => setVisibleEditForm(false)} />
        </Suspense>
      )}

      <Wrapper>
        {deleteLoading && <Spinner1 />}

        {isRetweeted && retweetedBy && (
          <RetweetedBy to={`/profile/${retweetedBy._id}`}>
            <AiOutlineRetweet /> {`${retweetedBy.name} retweeted`}
          </RetweetedBy>
        )}
        <Header>
          <AuthorWrapper>
            <Link to={`/profile/${tweet?.author?._id}`}>
              <UserAvatarSmall user={tweet?.author} />
            </Link>
            <div>
              <Link to={`/profile/${tweet?.author?._id}`}>
                <AuthorName>{tweet?.author?.name || ""}</AuthorName>
              </Link>
              <DateCreated>{calcDiffTimeString(tweet?.createdAt)}</DateCreated>
            </div>
          </AuthorWrapper>
          {(isAuthor && (
            <AuthorActions ref={dropdownRef}>
              <DropdownButton onClick={toggleDropdown}>
                <BiDotsVertical />
              </DropdownButton>
              <Dropdown
                isVisible={visibleDropdown}
                items={[
                  <AuthorAction onClick={() => setVisibleEditForm(true)}>
                    <AiOutlineEdit />
                    {t("edit")}
                  </AuthorAction>,
                  <AuthorAction onClick={onDeleteTweet}>
                    <AiOutlineDelete />
                    {t("delete")}
                  </AuthorAction>,
                ]}
              ></Dropdown>
            </AuthorActions>
          )) || (
            <AuthorActions ref={dropdownRef}>
              <DropdownButton onClick={toggleDropdown}>
                <BiDotsVertical />
              </DropdownButton>
              <Dropdown
                isVisible={visibleDropdown}
                items={[
                  <AuthorAction onClick={onReportTweet}>
                    <MdReportProblem />
                    {t("report")}
                  </AuthorAction>,
                ]}
              ></Dropdown>
            </AuthorActions>
          )}
        </Header>
        <Content>
          {tweet?.content && (
            <TweetDescription>{renderParsedTweet()}</TweetDescription>
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
                {tweet.media.map((url: string) => {
                  const mediaData: TMedia = {
                    url: url,
                    type: url.includes("video") ? "video" : "image",
                    id: v4(),
                  };

                  return (
                    <TweetMedia key={`tweet-media-${mediaData.id}`}>
                      <MediaViewer media={mediaData} />
                    </TweetMedia>
                  );
                })}
              </Carousel>
            </TweetMediaWrapper>
          )}

          <Interaction>
            <InteractionSummary>
              <InteractionSummaryItem onClick={() => setModalUserList("LIKED")}>
                {tweetLikeCount}
                {` ${t("like")}`}
              </InteractionSummaryItem>
              <InteractionSummaryItem>
                {totalTweetComments}
                {` ${t("comment")}`}
              </InteractionSummaryItem>
              <InteractionSummaryItem
                onClick={() => setModalUserList("RETWEETED")}
              >
                {tweetRetweetCount} {t("retweeted")}
              </InteractionSummaryItem>
              <InteractionSummaryItem onClick={() => setModalUserList("SAVED")}>
                {tweetSavedCount} {t("saved")}
              </InteractionSummaryItem>
            </InteractionSummary>

            <InteractionButtonGroup>
              <InteractionButton onClick={focusOnCommentForm}>
                <BiComment />
                <span>{t("comment")}</span>
              </InteractionButton>
              <InteractionButton onClick={onRetweet} retweeted={retweeted}>
                <FiRefreshCw />
                <span>{t("retweet")}</span>
              </InteractionButton>
              <InteractionButton onClick={onReactTweet} liked={liked}>
                <FaRegHeart />
                <span>{liked ? t("liked") : t("like")}</span>
              </InteractionButton>
              <InteractionButton onClick={onSaveTweet} saved={saved}>
                <BiBookmark />
                <span>{saved ? t("saved") : t("save")}</span>
              </InteractionButton>
            </InteractionButtonGroup>
          </Interaction>
        </Content>
        <AddCommentForm addCommentRef={addCommentRef} tweet={tweet} />
        <CommentsWrapper>
          {tweetComments?.map((comment: iComment) => {
            return <Comment data={comment} key={comment._id} />;
          })}
          {totalTweetComments > tweetComments.length && (
            <button onClick={() => fetchMoreTweetComment()}>
              {t("loadMoreComment")}
            </button>
          )}
        </CommentsWrapper>
      </Wrapper>
    </React.Fragment>
  );
};

export default Tweet;

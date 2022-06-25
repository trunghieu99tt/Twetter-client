import MessageContent from "@components/Chat/MessageContent";
import ImageMessageForm from "@components/Chat/MessageForms/ImageMessageForm";
import TextMessageForm from "@components/Chat/MessageForms/TextMessageForm";
import RoomImageGallery from "@components/Chat/RoomImageGallery";
import RoomList from "@components/Chat/RoomList";
import ImageWithPlaceholder from "@components/ImageWithPlaceholder";
import { Spinner1 } from "@components/Loaders";
import Logo from "@components/Logo";
import PageMetadata from "@components/PageMetadata";
import UserCard from "@components/UserCard";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import DefaultUnknownAvatar from "@images/user.png";
import { iMessage } from "@type/message.types";
import { iUser } from "@type/user.types";
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCallSharp } from "react-icons/io5";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import SimpleReactLightbox from "simple-react-lightbox";
import { roomsHaveCallState } from "states/call.state";
import classes from "./chatPage.module.css";
import { useChatPage } from "./useChatPage";
const Modal = lazy(() => import("@components/Modal"));

const ChatPage = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const {
    room,
    loading,
    message,
    messages,
    guestUser,
    chatImages,
    currentUser,
    chosenEmoji,
    messageImage,
    totalMessage,
    showMemberList,

    onSubmit,
    onChange,
    triggerCall,
    fetchNextPage,
    setChosenEmoji,
    setShowMemberList,
    onCloseImageMessageForm,
    openCreateNewGroupChatModal,
  } = useChatPage();
  const roomsHaveCall = useRecoilValue(roomsHaveCallState);

  const messageDiv = useRef<HTMLElement | null>(null);
  const loadMoreRef = useRef() as React.RefObject<HTMLDivElement>;

  const hasMore = totalMessage > messages?.length;
  const [shouldJumpToEnd, setShouldJumpToEnd] = React.useState(true);
  const [roomHasCall, setRoomHasCall] = useState<any>(null);

  useIntersectionObserver({
    target: loadMoreRef,
    enabled: hasMore,
    onIntersect: () => {
      setShouldJumpToEnd(false);
      fetchNextPage();
    },
  });

  useEffect(() => {
    if (shouldJumpToEnd && messageDiv && messageDiv.current) {
      messageDiv.current.scrollTop = messageDiv.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (room?._id) {
      const r = roomsHaveCall.find((r) => r.roomId === room._id);
      if (r) {
        setRoomHasCall(r);
      } else {
        setRoomHasCall(null);
      }
    }
  }, [roomsHaveCall, room?._id]);

  const { isDm, members, image, name } = room || {};

  let roomImage = image || "";
  let roomName = name || "";

  if (isDm) {
    roomImage = guestUser?.avatar || DefaultUnknownAvatar;
    roomName = guestUser?.name || "";
  }

  console.log("messages", messages);

  const roomMemberList = members?.map((member: iUser) => (
    <UserCard user={member} key={`room-member-card-${member._id}`} />
  ));

  console.log("messageImage", messageImage);

  return (
    <React.Fragment>
      <PageMetadata title={t("chatPage")} />
      <Suspense fallback={<div>Loading...</div>}>
        <Modal
          body={roomMemberList}
          header={t("roomMemberList")}
          isOpen={showMemberList}
          onCancel={() => setShowMemberList(false)}
        />
      </Suspense>
      {loading && <Spinner1 />}

      <div className={classes.root}>
        <aside className={classes.userList}>
          <div className={classes.logo}>
            <Logo />
          </div>
          <button
            className={classes.newGroupChat}
            onClick={openCreateNewGroupChatModal}
          >
            {t("createNewGroupChat")}
          </button>
          <RoomList />
        </aside>
        <main className={classes.main}>
          <section className={classes.mainHeader}>
            <div className={classes.headerInner}>
              <div className={classes.left}>
                <figure className={classes.roomImage}>
                  <ImageWithPlaceholder
                    key={room?._id}
                    src={roomImage}
                    alt={`${guestUser?.name}-wallpaper`}
                  />
                </figure>
                {(!isDm && (
                  <h2 className={classes.roomName}>{roomName}</h2>
                )) || (
                  <Link
                    to={`/profile/${guestUser?._id}`}
                    className={classes.roomName}
                  >
                    {roomName}
                  </Link>
                )}
              </div>
              <div className={classes.right}>
                {roomHasCall && (
                  <button
                    onClick={() => {
                      history.push(`/call/${roomHasCall?.channelName}`);
                    }}
                  >
                    Go to call
                  </button>
                )}
                {!roomHasCall && (
                  <button
                    className={classes.callButton}
                    onClick={() => triggerCall()}
                  >
                    <IoCallSharp />
                  </button>
                )}
              </div>
            </div>
          </section>
          <section className={classes.chatContent}>
            <div className={classes.content}>
              {messageImage.url && (
                <ImageMessageForm
                  data={messageImage}
                  onCancel={onCloseImageMessageForm}
                  onChange={onChange}
                  onSubmit={(e: any) => {
                    onSubmit(e);
                    setShouldJumpToEnd(true);
                  }}
                />
              )}

              <section className={classes.messageContainer} ref={messageDiv}>
                {hasMore && <div ref={loadMoreRef}>Loading...</div>}
                {messages?.map((message: iMessage) => {
                  if (message?.author?._id) {
                    return (
                      <MessageContent
                        key={`message-${message._id}`}
                        data={message}
                        isMyMessage={message.author._id === currentUser._id}
                      />
                    );
                  }

                  return null;
                })}
              </section>

              <TextMessageForm
                onChange={onChange}
                onSubmit={onSubmit}
                chosenEmoji={chosenEmoji}
                setChosenEmoji={setChosenEmoji}
                value={message}
              />
            </div>
          </section>
        </main>
        <aside>
          <article className={classes.roomInfo}>
            <figure className={classes.roomInfoImageWrapper}>
              <ImageWithPlaceholder
                src={roomImage}
                key={room?._id}
                alt={`${roomName}-bg`}
                customStyles="--size: 8rem;
                                width: var(--size);
                                height: var(--size);
                                object-fit: cover;
                                border-radius: 50%;"
              />
              <figcaption className={classes.roomInfoName}>
                {(!isDm && roomName) || (
                  <Link to={`/profile/${guestUser?._id}`}>{roomName}</Link>
                )}
              </figcaption>
            </figure>
          </article>

          {!isDm && (
            <button
              className={classes.showRoomMemberListBtn}
              onClick={() => setShowMemberList(true)}
            >
              {t("roomMemberList")}
            </button>
          )}

          <SimpleReactLightbox>
            <RoomImageGallery images={chatImages} />
          </SimpleReactLightbox>
        </aside>
      </div>
    </React.Fragment>
  );
};

export default ChatPage;

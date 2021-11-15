import React, { useEffect, useRef } from "react";
import SimpleReactLightbox from "simple-react-lightbox";
import { useTranslation } from "react-i18next";

// talons
import { useChatPage } from "./useChatPage";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";

// components
import CallModal from "@components/Call/CallModal";
import PageMetadata from "@components/PageMetadata";
import MessageContent from "@components/Chat/MessageContent";
import TextMessageForm from "@components/Chat/TextMessageForm";
import RoomImageGallery from "@components/Chat/RoomImageGallery";
import ChatPageUserList from "@components/Chat/ChatPageUserList";
import ImageMessageForm from "@components/Chat/ImageMessageForm";

// icons
import { IoCallSharp } from "react-icons/io5";
import { BsFillCameraVideoFill } from "react-icons/bs";

// images
import DefaultUnknownAvatar from "@images/user.png";

// types
import { iMessage } from "@type/message.types";

// styles
import classes from "./chatPage.module.css";
import { Spinner1 } from "@components/Loaders";
import Logo from "@components/Logo";
import CreateNewGroupChat from "@components/Chat/CreateNewGroupChat";

const ChatPage = () => {
    const { t } = useTranslation();

    const {
        call,
        loading,
        message,
        messages,
        guestUser,
        chatImages,
        currentUser,
        chosenEmoji,
        messageImage,
        totalMessage,
        visibleNewGroupChatModal,

        onSubmit,
        onChange,
        openAudioCall,
        fetchNextPage,
        openVideoCall,
        setChosenEmoji,
        onCloseImageMessageForm,
        setVisibleNewGroupChatModal,
    } = useChatPage();

    const messageDiv = useRef<HTMLElement | null>(null);
    const loadMoreRef = useRef() as React.RefObject<HTMLDivElement>;

    const hasMore = totalMessage > messages?.length;
    const [shouldJumpToEnd, setShouldJumpToEnd] = React.useState(true);

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

    return (
        <React.Fragment>
            <PageMetadata title={t("chatPage")} />
            {loading && <Spinner1 />}
            {call && <CallModal />}
            {visibleNewGroupChatModal && <CreateNewGroupChat />}

            <div className={classes.root}>
                <aside className={classes.userList}>
                    <div className={classes.logo}>
                        <Logo />
                    </div>
                    <button
                        className={classes.newGroupChat}
                        onClick={() => setVisibleNewGroupChatModal(true)}
                    >
                        {t("createNewGroupChat")}
                    </button>
                    <ChatPageUserList />
                </aside>
                <main className={classes.main}>
                    <section className={classes.mainHeader}>
                        <div className={classes.headerInner}>
                            <div className={classes.left}>
                                <figure className={classes.roomImage}>
                                    <img
                                        src={
                                            guestUser?.avatar ||
                                            DefaultUnknownAvatar
                                        }
                                        alt={`${guestUser?.name}-wallpaper`}
                                    />
                                </figure>
                                <h2 className={classes.roomName}>
                                    {guestUser?.name}
                                </h2>
                            </div>
                            <div className={classes.right}>
                                <button
                                    className={classes.callButton}
                                    onClick={openAudioCall}
                                >
                                    <IoCallSharp />
                                </button>
                                <button
                                    className={classes.callButton}
                                    onClick={openVideoCall}
                                >
                                    <BsFillCameraVideoFill />
                                </button>
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

                            <section
                                className={classes.messageContainer}
                                ref={messageDiv}
                            >
                                {hasMore && (
                                    <div ref={loadMoreRef}>Loading...</div>
                                )}
                                {messages?.map((message: iMessage) => {
                                    return (
                                        <MessageContent
                                            key={`message-${message._id}`}
                                            data={message}
                                            isMyMessage={
                                                message.author._id ===
                                                currentUser._id
                                            }
                                        />
                                    );
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
                            <img
                                src={guestUser?.avatar || DefaultUnknownAvatar}
                                alt={`${guestUser?.name} avatar`}
                                className={classes.roomInfoImage}
                            />
                            <figcaption className={classes.roomInfoName}>
                                {guestUser?.name}
                            </figcaption>
                        </figure>
                    </article>
                    <SimpleReactLightbox>
                        <RoomImageGallery images={chatImages} />
                    </SimpleReactLightbox>
                </aside>
            </div>
        </React.Fragment>
    );
};

export default ChatPage;

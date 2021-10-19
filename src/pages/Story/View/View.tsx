import React, { useEffect, useMemo, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import cn from "classnames";
import { useHistory } from "react-router";

// talons
import { useUser } from "@talons/useUser";

// components
import Logo from "@components/Logo";
import StoryViewer from "@components/Story/StoryViewer";

// icons
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";

// types
import { iStory } from "@type/story.types";
import { iUser } from "@type/user.types";

// states
import { activeStoryGroupOwnerIdState, storiesState } from "states/story.state";

// models
import { UserModel } from "model/user.model";

// styles
import classes from "./view.module.css";
import { useStory } from "@talons/useStory";

type TDirection = "LEFT" | "RIGHT";

const View = () => {
    const { user: currentUser } = useUser();
    const { updateStoryMutation } = useStory();

    const history = useHistory();
    const storyGroups = useRecoilValue(storiesState);
    const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
    const [activeStoryGroupOwnerId, setActiveStoryGroupOwnerId] =
        useRecoilState(activeStoryGroupOwnerIdState);

    const [activeStoryIdx, setActiveStoryIdx] = React.useState<number>(0);
    const [activeStoryGroupIdx, setActiveStoryGroupIdx] =
        React.useState<number>(0);

    const owners =
        storyGroups &&
        Object.values(storyGroups).map((stories: iStory[]) =>
            new UserModel(stories[0].owner).getData()
        );
    const stories = useMemo(() => {
        return (storyGroups && Object.entries(storyGroups)) || [];
    }, [storyGroups]);

    const activeGroupStories =
        (stories &&
            stories?.[activeStoryGroupIdx]?.length > 1 &&
            stories?.[activeStoryGroupIdx][1]) ||
        [];
    const activeStory: iStory | null =
        activeGroupStories?.[activeStoryIdx] || null;

    const onClick = (userId: string) => {
        setActiveStoryGroupOwnerId(userId);
    };

    const onArrowClick = (direction: TDirection) => {
        if (direction === "LEFT") {
            const nextActiveStoryIdx = activeStoryIdx - 1;

            if (nextActiveStoryIdx < 0) {
                if (activeStoryGroupIdx > 0) {
                    setActiveStoryGroupIdx(activeStoryGroupIdx - 1);
                    setActiveStoryIdx(0);
                }
            } else {
                setActiveStoryIdx(nextActiveStoryIdx);
            }
        } else {
            const nextActiveIdx = activeStoryIdx + 1;

            if (nextActiveIdx >= itemsRef.current.length) {
                if (activeStoryGroupIdx < owners!.length - 1) {
                    setActiveStoryGroupIdx(activeStoryGroupIdx + 1);
                    setActiveStoryIdx(0);
                }
            } else {
                setActiveStoryIdx(nextActiveIdx);
            }
        }
    };

    useEffect(() => {
        if (itemsRef?.current) {
            // add animationend event listener for each item
            itemsRef.current.forEach((item: HTMLDivElement | null, idx) => {
                if (item) {
                    item.addEventListener("animationend", () => {
                        const nextIdx = idx + 1;
                        if (idx < itemsRef.current.length) {
                            itemsRef.current[nextIdx]?.classList.add(
                                classes.active
                            );
                        }
                        // remove animation
                        item.classList.remove(classes.active);
                        item.classList.add(classes.passed);

                        if (nextIdx < activeGroupStories.length) {
                            setActiveStoryIdx(nextIdx);
                        } else {
                            if (activeStoryGroupIdx < stories!.length - 1) {
                                setActiveStoryIdx(0);
                                setActiveStoryGroupIdx(activeStoryGroupIdx + 1);
                            } else {
                                setActiveStoryGroupOwnerId(null);
                                history.push("/");
                            }
                        }
                    });
                }
            });
        }
    }, [itemsRef, activeGroupStories]);

    useEffect(() => {
        setActiveStoryGroupIdx(
            stories.findIndex(([userId]) => userId === activeStoryGroupOwnerId)
        );
    }, [stories, activeStoryGroupOwnerId]);

    useEffect(() => {
        if (activeStory) {
            const viewerIds = activeStory?.viewerIds || [];

            if (!viewerIds.includes(currentUser?._id)) {
                updateStoryMutation.mutate({
                    storyId: activeStory._id,
                });
            }
        }
    }, [activeStory]);

    const hasPreviousButton =
        activeGroupStories.length > 0 &&
        (activeStoryGroupIdx > 0 ||
            (activeStoryGroupIdx === 0 && activeStoryIdx > 0));

    const hasNextButton =
        owners &&
        owners.length > 0 &&
        activeGroupStories.length > 0 &&
        (activeStoryGroupIdx < owners!.length - 1 ||
            (activeStoryGroupIdx === owners!.length - 1 &&
                activeStoryIdx < activeGroupStories.length - 1));

    return (
        <div className={classes.root}>
            <aside className={classes.aside}>
                <Logo />

                <h3 className={classes.asideHeading}>Stories</h3>
                {owners?.map((owner: iUser) => {
                    const userStories = storyGroups?.[owner._id];

                    const newestCreatedStoryTime = userStories?.reduce(
                        (acc: Date, story: iStory) => {
                            const storyTime = new Date(story.createdAt);
                            return storyTime.getTime() > new Date(acc).getTime()
                                ? storyTime
                                : acc;
                        },
                        new Date("1990-01-01")
                    );

                    const diff = Math.floor(
                        (Date.now() - newestCreatedStoryTime!.getTime()) / 1000
                    );

                    let storyTimeText = null;

                    if (diff < 60) {
                        storyTimeText = `${diff} seconds ago`;
                    } else if (diff < 3600) {
                        storyTimeText = `${Math.floor(diff / 60)} minutes ago`;
                    } else if (diff < 86400) {
                        storyTimeText = `${Math.floor(diff / 3600)} hours ago`;
                    } else {
                        storyTimeText = `${Math.floor(diff / 86400)} days ago`;
                    }

                    const isViewedAllStories = userStories?.every(
                        (story: iStory) =>
                            story.viewerIds.includes(currentUser._id)
                    );

                    return (
                        <figure
                            className={classes.userStoryCard}
                            key={`user-story-card-list-${owner._id}`}
                            onClick={() => onClick(owner._id)}
                        >
                            <img
                                src={owner.avatar}
                                alt="owner-avatar"
                                className={cn(classes.userAvatar, {
                                    [classes.notViewedStory]:
                                        !isViewedAllStories,
                                })}
                            />
                            <figcaption className={classes.info}>
                                <p className={classes.userName}>{owner.name}</p>
                                <p className={classes.newestStoryTime}>
                                    {storyTimeText}
                                </p>
                            </figcaption>
                        </figure>
                    );
                })}
            </aside>
            <main className={classes.main}>
                <div className={classes.inner}>
                    {!stories && <p>Choose a story to view!</p>}
                    {owners && stories && (
                        <React.Fragment>
                            {hasPreviousButton && (
                                <button
                                    onClick={() => onArrowClick("LEFT")}
                                    className={cn(
                                        classes.arrow,
                                        classes.arrowLeft
                                    )}
                                >
                                    <AiFillLeftCircle />
                                </button>
                            )}
                            <div
                                className={classes.progresses}
                                key={`user-story-progress-${activeStoryGroupIdx}`}
                            >
                                {[...Array(activeGroupStories.length)].map(
                                    (_, idx: number) => {
                                        return (
                                            <div
                                                className={cn(
                                                    classes.progress,
                                                    {
                                                        [classes.active]:
                                                            idx ===
                                                            activeStoryIdx,
                                                    }
                                                )}
                                                ref={(el) =>
                                                    (itemsRef.current[idx] = el)
                                                }
                                            />
                                        );
                                    }
                                )}
                            </div>
                            {activeStory && <StoryViewer data={activeStory} />}
                            {hasNextButton && (
                                <button
                                    onClick={() => onArrowClick("RIGHT")}
                                    className={cn(
                                        classes.arrow,
                                        classes.arrowRight
                                    )}
                                >
                                    <AiFillRightCircle />
                                </button>
                            )}
                        </React.Fragment>
                    )}
                </div>
            </main>
        </div>
    );
};

export default View;

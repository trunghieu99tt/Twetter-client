import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import cn from "classnames";
import { useHistory, useParams } from "react-router";

// talons
import { useUser } from "@talons/useUser";
import { useStory } from "@talons/useStory";

// components
import Logo from "@components/Logo";
import StoryViewer from "@components/Story/StoryViewer";

// icons
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";

// constants
import { STORY_ROUTES } from "routes/routes";

// types
import { iStory } from "@type/story.types";
import { iUser } from "@type/user.types";

// states
import {
    ownersSelector,
    storiesState,
    storySelector,
    userStoryMetadataSelector,
} from "states/story.state";

// styles
import classes from "./view.module.css";

type TDirection = "LEFT" | "RIGHT";

const View = () => {
    const params: {
        userId: string;
    } = useParams();
    const userId = params.userId;

    const { user: currentUser } = useUser();
    const { updateStoryMutation } = useStory();

    const history = useHistory();
    const owners = useRecoilValue(ownersSelector);
    const storyGroups = useRecoilValue(storiesState);
    const userStories = useRecoilValue(storySelector(userId));
    const userStoryMetadata = useRecoilValue(userStoryMetadataSelector(userId));

    const [activeStoryIdx, setActiveStoryIdx] = React.useState<number>(0);
    const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

    const activeStory: iStory | null = userStories?.[activeStoryIdx] || null;

    const onViewUserStories = (userId: string) => {
        history.push(`${STORY_ROUTES.VIEW}/${userId}`);
        setActiveStoryIdx(0);
    };

    const onArrowClick = (direction: TDirection) => {
        /**
         * 1. click on the left arrow
         * a. if the active story is the first story, if we have prev user, go to view stories of prev user
         * b. if the active story is not the first story, go to prev story
         */

        if (direction === "LEFT") {
            if (activeStoryIdx === 0) {
                if (userStoryMetadata?.prevUserId) {
                    onViewUserStories(userStoryMetadata.prevUserId);
                }
            } else {
                setActiveStoryIdx(activeStoryIdx - 1);
            }
        } else {
            /**
             * 2. click on the right arrow
             * a. if the active story is the last story, if we have next user, go to view stories of next user
             * b. if the active story is not the last story, go to next story
             */
            if (userStories) {
                if (activeStoryIdx === userStories.length - 1) {
                    if (userStoryMetadata?.nextUserId) {
                        onViewUserStories(userStoryMetadata.nextUserId);
                    }
                } else {
                    setActiveStoryIdx(activeStoryIdx + 1);
                }
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

                        if (nextIdx < userStories!.length) {
                            setActiveStoryIdx(nextIdx);
                        } else {
                            if (userStoryMetadata?.nextUserId) {
                                onViewUserStories(userStoryMetadata.nextUserId);
                            } else {
                                history.push("/");
                            }
                        }
                    });
                }
            });
        }
    }, [itemsRef, userStories]);

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

    /**
     * Has next button:
     * 1. If current user has more than 1 story and we are not on the last story
     * 2. if there's a next user
     *
     * Has prev button:
     * 1. If current user has more than 1 story and we are not on the first story
     * 2. if there's a prev user
     */

    const hasPreviousButton =
        (userStories && userStories?.length > 1 && activeStoryIdx > 0) ||
        userStoryMetadata?.prevUserId !== null;

    const hasNextButton =
        (userStories &&
            userStories?.length > 1 &&
            activeStoryIdx < userStories.length - 1) ||
        userStoryMetadata?.nextUserId !== null;

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
                            onClick={() => onViewUserStories(owner._id)}
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
                    {!userId && <p>Choose a story to view!</p>}
                    {owners && userStories && (
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
                                key={`progress-${userId}`}
                            >
                                {[...Array(userStories.length)].map(
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
                                                key={`progress-bar-${userId}-${idx}`}
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

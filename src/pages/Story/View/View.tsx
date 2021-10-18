import { useRecoilState, useRecoilValue } from "recoil";
import cn from "classnames";

// talons
import { useUser } from "@talons/useUser";

// components
import Logo from "@components/Logo";

// types
import { iStory } from "@type/story.types";
import { iUser } from "@type/user.types";

// states
import { activeUserStoryState, storiesState } from "states/story.state";

// models
import { UserModel } from "model/user.model";

// styles
import classes from "./view.module.css";
import React, { useEffect, useRef } from "react";
import StoryViewer from "@components/Story/StoryViewer";

const View = () => {
    const { user: currentUser } = useUser();
    const storyGroups = useRecoilValue(storiesState);
    const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

    const [activeUserStory, setActiveUserStory] =
        useRecoilState(activeUserStoryState);

    const [activeIdx, setActiveIdx] = React.useState<number>(0);

    const onClick = (userId: string) => {
        setActiveUserStory(userId);
    };

    const owners =
        storyGroups &&
        Object.values(storyGroups).map((stories: iStory[]) =>
            new UserModel(stories[0].owner).getData()
        );

    const stories = (activeUserStory && storyGroups?.[activeUserStory]) || [];

    useEffect(() => {
        if (
            itemsRef?.current &&
            stories &&
            itemsRef.current.length === stories.length
        ) {
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
                        // setActiveIdx(nextIdx);
                    });
                }
            });
        }
    }, [itemsRef, stories]);

    const activeStory: iStory | null = stories?.[activeIdx] || null;

    console.log(`storyGroups`, storyGroups);
    console.log(`stories`, stories);
    console.log(`activeStory`, activeStory);

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
                    {stories && (
                        <React.Fragment>
                            <div className={classes.progresses}>
                                {[...Array(stories.length)].map(
                                    (_, idx: number) => {
                                        return (
                                            <div
                                                className={cn(
                                                    classes.progress,
                                                    {
                                                        [classes.active]:
                                                            idx === activeIdx,
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
                        </React.Fragment>
                    )}
                </div>
            </main>
        </div>
    );
};

export default View;

import Dropdown from "@components/Dropdown";
import Logo from "@components/Logo";
import PageMetadata from "@components/PageMetadata";
import StoryViewer from "@components/Story/StoryViewer";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import DefaultUnknownAvatar from "@images/user.png";
import { useStory } from "@talons/useStory";
import { useUser } from "@talons/useUser";
import { iStory } from "@type/story.types";
import { iUser } from "@type/user.types";
import { calcDiffTimeString } from "@utils/helper";
import cn from "classnames";
import { isEqual } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AiFillLeftCircle,
  AiFillRightCircle,
  AiOutlineDelete,
} from "react-icons/ai";
import { BiDotsVertical } from "react-icons/bi";
import { useHistory, useParams } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { STORY_ROUTES } from "routes/routes";
import {
  ownersSelector,
  storiesState,
  storySelector,
  userStoryMetadataSelector,
} from "states/story.state";
import classes from "./view.module.css";

type TDirection = "LEFT" | "RIGHT";

const View = (): JSX.Element => {
  const { t } = useTranslation();

  const params: {
    userId: string;
  } = useParams();
  const userId = params.userId;

  const { user: currentUser } = useUser();
  const {
    updateStoryMutation,
    deleteStoryMutation,
    getStoriesFeedQuery,
    groupStoryByUser,
  } = useStory();

  const history = useHistory();
  const owners = useRecoilValue(ownersSelector);
  const userStories = useRecoilValue(storySelector(userId));
  const [storyGroups, setStoryGroups] = useRecoilState(storiesState);
  const userStoryMetadata = useRecoilValue(userStoryMetadataSelector(userId));

  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(0);
  const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);

  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const dropdownRef = useRef() as React.RefObject<HTMLDivElement>;

  useOnClickOutside(dropdownRef, () => setVisibleDropdown(false));

  const activeStory: iStory | null = userStories?.[activeStoryIdx] || null;

  const storyList = getStoriesFeedQuery.data;

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

  const toggleDropDown = () => setVisibleDropdown((v) => !v);

  const deleteStory = async () => {
    if (activeStory?._id) {
      const { _id } = activeStory;
      await deleteStoryMutation.mutateAsync({
        storyId: _id,
      });

      // reload the page
      window.location.reload();
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
              itemsRef.current[nextIdx]?.classList.add(classes.active);
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

    if (!userStories || userStories?.length === 0) {
      history.push("/");
    }

    return () => {
      if (itemsRef?.current) {
        itemsRef.current.forEach((item: HTMLDivElement | null) => {
          if (item) {
            item.removeEventListener("animationend", () => {
              item.classList.remove(classes.active);
              item.classList.remove(classes.passed);
            });
          }
        });
      }
    };
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

  useEffect(() => {
    const newStoriesByUsers = groupStoryByUser(storyList);
    if (!isEqual(storyGroups, newStoriesByUsers)) {
      setStoryGroups(newStoriesByUsers);
    }
  }, [storyList]);

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

  const isCurrentUserOwner = currentUser?._id === activeStory?.owner._id;

  return (
    <React.Fragment>
      <PageMetadata title="Story" />
      <div className={classes.root}>
        <aside className={classes.aside}>
          <Logo />

          <h3 className={classes.asideHeading}>Stories</h3>
          {owners?.map((owner: iUser) => {
            const userStories = storyGroups?.[owner._id];

            const newestCreatedStoryTime =
              userStories?.reduce((acc: Date, story: iStory) => {
                const storyTime = new Date(story.createdAt);
                return storyTime.getTime() > new Date(acc).getTime()
                  ? storyTime
                  : acc;
              }, new Date("1990-01-01")) || new Date();

            const storyTimeText = calcDiffTimeString(newestCreatedStoryTime);

            const isViewedAllStories = userStories?.every((story: iStory) =>
              story.viewerIds.includes(currentUser._id)
            );

            return (
              <figure
                className={cn(classes.userStoryCard, {
                  [classes.active]: owner._id === activeStory?.owner._id,
                })}
                key={`user-story-card-list-${owner._id}`}
                onClick={() => onViewUserStories(owner._id)}
              >
                <img
                  src={owner?.avatar || DefaultUnknownAvatar}
                  alt="owner-avatar"
                  className={cn(classes.userAvatar, {
                    [classes.notViewedStory]: !isViewedAllStories,
                  })}
                  loading="lazy"
                />
                <figcaption className={classes.info}>
                  <p className={classes.userName}>{owner.name}</p>
                  <p className={classes.newestStoryTime}>{storyTimeText}</p>
                </figcaption>
              </figure>
            );
          })}
        </aside>
        <main className={classes.main}>
          <div className={classes.inner}>
            {!userId && <p>{t("chooseStoryToView")}</p>}
            {owners && userStories && (
              <React.Fragment>
                {isCurrentUserOwner && (
                  <div ref={dropdownRef} className={classes.storyAction}>
                    <button onClick={toggleDropDown}>
                      <BiDotsVertical />
                    </button>
                    <Dropdown
                      isVisible={visibleDropdown}
                      items={[
                        <button
                          onClick={deleteStory}
                          className={classes.storyActionDelete}
                        >
                          <AiOutlineDelete />
                          {t("delete")}
                        </button>,
                      ]}
                    />
                  </div>
                )}
                {hasPreviousButton && (
                  <button
                    onClick={() => onArrowClick("LEFT")}
                    className={cn(classes.arrow, classes.arrowLeft)}
                  >
                    <AiFillLeftCircle />
                  </button>
                )}
                <div className={classes.progresses} key={`progress-${userId}`}>
                  {[...Array(userStories.length)].map((_, idx: number) => {
                    return (
                      <div
                        className={cn(classes.progress, {
                          [classes.active]: idx === activeStoryIdx,
                        })}
                        ref={(el) => (itemsRef.current[idx] = el)}
                        key={`progress-bar-${userId}-${idx}`}
                      />
                    );
                  })}
                </div>
                {activeStory && <StoryViewer data={activeStory} />}
                {hasNextButton && (
                  <button
                    onClick={() => onArrowClick("RIGHT")}
                    className={cn(classes.arrow, classes.arrowRight)}
                  >
                    <AiFillRightCircle />
                  </button>
                )}
              </React.Fragment>
            )}
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default View;

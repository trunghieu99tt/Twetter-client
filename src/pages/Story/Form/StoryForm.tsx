import React, { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// talons
import { useUser } from "@talons/useUser";
import { useStory } from "@talons/useStory";

// components
import Logo from "@components/Logo";
import { Spinner1 } from "@components/Loaders";
import PageMetadata from "@components/PageMetadata";
import TextStory from "@components/Story/StoryForm/Text/TextStory";
import ImageStory from "@components/Story/StoryForm/Image/ImageStory";
import AudienceSetting from "@components/Story/AudienceSetting/AudienceSetting";

// icons
import { IoIosImages } from "react-icons/io";
import { GoTextSize } from "react-icons/go";

// images
import DefaultUnknownAvatar from "@images/user.png";

// styles
import classes from "./storyForm.module.css";

type STORY_TYPE = "IMAGE" | "TEXT";

const StoryForm = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const [storyType, setStoryType] = useState<STORY_TYPE | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useUser();
    const { createStoryMutation } = useStory();

    const onCancel = () => setStoryType(null);

    const onSubmit = async (data: string) => {
        if (storyType) {
            console.log("audience: ", user.storyAudience);

            createStoryMutation.mutate(
                {
                    content: data,
                    type: storyType,
                    audience: user.storyAudience,
                },
                {
                    onSuccess: () => {
                        toast.success(t("createStorySuccess"));
                        history.push("/");
                        setLoading(false);
                    },
                    onError: () => {
                        setLoading(false);
                    },
                }
            );
        }
    };

    let content = null;

    switch (storyType) {
        case "IMAGE":
            content = (
                <ImageStory
                    onCancel={onCancel}
                    onSubmit={onSubmit}
                    setLoading={setLoading}
                />
            );
            break;
        case "TEXT":
            content = (
                <TextStory
                    onCancel={onCancel}
                    onSubmit={onSubmit}
                    setLoading={setLoading}
                />
            );
            break;
    }

    return (
        <React.Fragment>
            <PageMetadata title={t("createNewStory")} />
            <div className={classes.root}>
                {loading && <Spinner1 />}
                <header className={classes.header}>
                    <Logo />
                </header>
                <div className={classes.top}>
                    <h2>{t("stories")}</h2>
                    <div className={classes.topMain}>
                        <figure className={classes.userInfo}>
                            <img
                                src={user?.avatar || DefaultUnknownAvatar}
                                alt={user?.name}
                                className={classes.userAvatar}
                            />
                            <figcaption className={classes.userFullName}>
                                {user?.name}
                            </figcaption>
                        </figure>
                    </div>
                    <div className={classes.topFooter}>
                        <p>{t("whoCanSeeYourStory")}?</p>
                        <AudienceSetting />
                    </div>
                </div>
                {content ? (
                    content
                ) : (
                    <React.Fragment>
                        <div className={classes.main}>
                            <button
                                className={classes.createImageButton}
                                onClick={() => setStoryType("IMAGE")}
                            >
                                <div>
                                    <IoIosImages />
                                </div>
                                <p>{t("imageStory")}</p>
                            </button>
                            <button
                                className={classes.createTextButton}
                                onClick={() => setStoryType("TEXT")}
                            >
                                <div>
                                    <GoTextSize />
                                </div>
                                <p>{t("textStory")}</p>
                            </button>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </React.Fragment>
    );
};

export default StoryForm;

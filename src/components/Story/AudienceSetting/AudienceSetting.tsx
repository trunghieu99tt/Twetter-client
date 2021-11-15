import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import debounce from "lodash/debounce";

// talons
import { useUser } from "@talons/useUser";
import { useOnClickOutside } from "@hooks/useOnClickOutside";

// components
import Dropdown from "@components/Dropdown";

// icons
import { BsFillPeopleFill } from "react-icons/bs";
import { MdPublic } from "react-icons/md";

// styles
import classes from "./audienceSetting.module.css";

const AudienceSetting = () => {
    const { t } = useTranslation();
    const { user, updateUserMutation } = useUser();

    const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);
    const [selectedAudience, setSelectedAudience] = useState<number>(
        user?.storyAudience || 0
    );

    // create debounced function to change user story audience using usecallback
    const debouncedUpdateUserStoryAudience = useMemo(
        () =>
            debounce(async (storyAudience: number) => {
                updateUserMutation.mutate({
                    updatedUser: {
                        storyAudience,
                    },
                    userId: user?._id,
                });
            }, 1000),
        [updateUserMutation, user]
    );

    const onChangeUserStoryAudience = async (audience: number) => {
        setSelectedAudience(audience);
        debouncedUpdateUserStoryAudience(audience);
    };

    const dropdownRef = useRef() as React.RefObject<HTMLDivElement>;

    const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

    useOnClickOutside(dropdownRef, () => setVisibleDropdown(false));

    const audienceSettings = useMemo(
        () => [
            {
                text: t("everyone"),
                icon: <MdPublic />,
                value: 0,
            },
            {
                text: t("peopleFollowYou"),
                icon: <BsFillPeopleFill />,
                value: 1,
            },
        ],
        []
    );

    const renderAudience = () => {
        const { text, icon } = audienceSettings[selectedAudience];
        return (
            <div className={classes.audience} onClick={toggleDropdown}>
                <div className={classes.audienceIcon}>{icon}</div>
                <div className={classes.audienceLabel}>{text}</div>
            </div>
        );
    };

    const selections = useMemo(() => {
        return audienceSettings.map((audience, idx: number) => {
            return (
                <button
                    className={classes.audienceSelectionItem}
                    key={`audience-setting-${idx}`}
                    onClick={() => onChangeUserStoryAudience(audience.value)}
                >
                    {audience.icon}
                    <span>{audience.text}</span>
                </button>
            );
        });
    }, []);

    return (
        <article ref={dropdownRef} className={classes.root}>
            {renderAudience()}
            <Dropdown isVisible={visibleDropdown} items={selections}></Dropdown>
        </article>
    );
};

export default AudienceSetting;

import { v4 } from "uuid";
import React, { useMemo, useRef, useState } from "react";

// talons
import { useUser } from "@talons/useUser";
import { useOnClickOutside } from "@hooks/useOnClickOutside";

// components
import Dropdown from "@components/Dropdown";

// icons
import { BsFillPeopleFill } from "react-icons/bs";
import { MdPublic } from "react-icons/md";

import classes from "./audienceSetting.module.css";

const audienceSettings = [
    {
        text: "Everyone",
        icon: <MdPublic />,
        value: 0,
    },
    {
        text: "People follow you",
        icon: <BsFillPeopleFill />,
        value: 1,
    },
];

const AudienceSetting = () => {
    const { user } = useUser();

    const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);
    const [selectedAudience, setSelectedAudience] = useState<number>(
        user?.storyAudience || 0
    );

    const dropdownRef = useRef() as React.RefObject<HTMLDivElement>;

    const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

    useOnClickOutside(dropdownRef, () => setVisibleDropdown(false));

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
                    onClick={() => setSelectedAudience(audience.value)}
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

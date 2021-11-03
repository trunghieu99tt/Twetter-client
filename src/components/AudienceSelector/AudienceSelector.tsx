import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

// talons
import { useOnClickOutside } from "@hooks/useOnClickOutside";

// components
import Dropdown from "@components/Dropdown";

// icons
import { MdPublic } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";

import {
    Audience,
    AudienceIcon,
    AudienceText,
    Wrapper,
    AudienceSelectionItem,
} from "./AudienceSelectorStyle";

type Props = {
    audience: number;
    setAudience: (audience: number) => void;
};

const AudienceSelector = ({ audience, setAudience }: Props) => {
    const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);
    const dropdownRef = useRef() as React.RefObject<HTMLDivElement>;

    const { t } = useTranslation();

    const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

    useOnClickOutside(dropdownRef, () => setVisibleDropdown(false));

    const audiences = [
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
    ];

    const renderAudience = () => {
        const { text, icon } = audiences[audience];
        return (
            <Audience onClick={toggleDropdown}>
                <AudienceIcon>{icon}</AudienceIcon>
                <AudienceText>{text}</AudienceText>
            </Audience>
        );
    };

    const selections = audiences.map((audience, index) => {
        return (
            <AudienceSelectionItem onClick={() => setAudience(audience.value)}>
                {audience.icon}
                <span>{audience.text}</span>
            </AudienceSelectionItem>
        );
    });

    return (
        <Wrapper ref={dropdownRef}>
            {renderAudience()}
            <Dropdown isVisible={visibleDropdown} items={selections} />
        </Wrapper>
    );
};

export default AudienceSelector;

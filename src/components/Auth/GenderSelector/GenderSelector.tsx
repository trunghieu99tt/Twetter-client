import React, { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";

// talons
import { useOnClickOutside } from "@hooks/useOnClickOutside";

// components
import Dropdown from "@components/Dropdown";

// icons
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { IoMaleFemaleSharp } from "react-icons/io5";

import {
    Gender,
    GenderIcon,
    GenderText,
    Wrapper,
    GenderSelectionItem,
} from "./GenderSelectorStyle";

type Props = {
    gender: number;
    setGender: (audience: number) => void;
};

const GenderSelector = ({ gender, setGender }: Props) => {
    const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);
    const dropdownRef = useRef() as React.RefObject<HTMLDivElement>;
    const { t } = useTranslation();

    const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

    useOnClickOutside(dropdownRef, () => setVisibleDropdown(false));

    const genderSelections = [
        {
            value: 0,
            label: t("male"),
            id: uuid(),
            icon: <IoMdMale />,
        },
        {
            value: 1,
            label: t("female"),
            id: uuid(),
            icon: <IoMdFemale />,
        },
        {
            value: 2,
            label: t("other"),
            id: uuid(),
            icon: <IoMaleFemaleSharp />,
        },
    ];

    const renderGender = () => {
        const { label, icon } = genderSelections[gender];
        return (
            <Gender onClick={toggleDropdown}>
                <GenderIcon>{icon}</GenderIcon>
                <GenderText>{label}</GenderText>
            </Gender>
        );
    };

    const selections = genderSelections.map((gender) => {
        return (
            <GenderSelectionItem
                onClick={() => setGender(gender.value)}
                key={gender.id}
            >
                {gender.icon}
                <span>{gender.label}</span>
            </GenderSelectionItem>
        );
    });

    return (
        <Wrapper ref={dropdownRef}>
            {renderGender()}
            <Dropdown isVisible={visibleDropdown} items={selections} />
        </Wrapper>
    );
};

export default GenderSelector;

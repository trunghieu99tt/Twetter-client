import React from "react";
import { useState, useRef } from "react";
import { v4 as uuid } from "uuid";

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

const genderSelections = [
    {
        value: 0,
        label: "Male",
        id: uuid(),
        icon: <IoMdMale />,
    },
    {
        value: 1,
        label: "Female",
        id: uuid(),
        icon: <IoMdFemale />,
    },
    {
        value: 2,
        label: "Others",
        id: uuid(),
        icon: <IoMaleFemaleSharp />,
    },
];

type Props = {
    gender: number;
    setGender: (audience: number) => void;
};

const GenderSelector = ({ gender, setGender }: Props) => {
    const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);

    const dropdownRef = useRef() as React.RefObject<HTMLDivElement>;

    const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

    useOnClickOutside(dropdownRef, () => setVisibleDropdown(false));

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

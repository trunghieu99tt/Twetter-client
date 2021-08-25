import React, { useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";

// talons
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import { useUser } from "@talons/useUser";

// components
import Dropdown from "@components/Dropdown";

// icons
import { BsFillCaretDownFill } from "react-icons/bs";
import { MdSupervisorAccount } from "react-icons/md";
import { RiLogoutBoxRLine, RiAccountCircleFill } from "react-icons/ri";

// mock data

// styles
import {
    Avatar,
    AvatarCaption,
    AvatarWrapper,
    DropdownButton,
    LogoutButton,
    Wrapper,
} from "./MyAccountStyle";

const MyAccountMenu = () => {
    const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);

    const { user } = useUser();

    const myAccountControllerRef =
        useRef() as React.MutableRefObject<HTMLDivElement>;

    const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

    const handleLogout = () => {};

    useOnClickOutside(myAccountControllerRef, () => setVisibleDropdown(false));

    const dropdownItems = useMemo(
        () => [
            <Link to="/my-profile">
                <RiAccountCircleFill></RiAccountCircleFill>
                <p>Profile</p>
            </Link>,
            <Link to="/">
                <MdSupervisorAccount></MdSupervisorAccount>
                <p>Group chat</p>
            </Link>,
            <LogoutButton onClick={handleLogout}>
                <RiLogoutBoxRLine></RiLogoutBoxRLine>
                <p>Logout</p>
            </LogoutButton>,
        ],
        []
    );

    return (
        <Wrapper ref={myAccountControllerRef}>
            <AvatarWrapper>
                <Avatar src={user?.avatar || ""} alt={user?.name} />
                <AvatarCaption>{user?.name}</AvatarCaption>
                <DropdownButton onClick={toggleDropdown}>
                    <BsFillCaretDownFill />
                </DropdownButton>
            </AvatarWrapper>

            <Dropdown isVisible={visibleDropdown} items={dropdownItems} />
        </Wrapper>
    );
};

export default MyAccountMenu;

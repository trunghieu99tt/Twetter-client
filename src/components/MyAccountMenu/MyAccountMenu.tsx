import React, { useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";

// talons
import { useUser } from "@talons/useUser";
import { useOnClickOutside } from "@hooks/useOnClickOutside";

// components
import Dropdown from "@components/Dropdown";
import UserAvatarSmall from "@components/UserAvatarSmall";

// icons
import { BsFillCaretDownFill } from "react-icons/bs";
import { MdSupervisorAccount } from "react-icons/md";
import { RiLogoutBoxRLine, RiAccountCircleFill } from "react-icons/ri";

// mock data

// styles
import {
    AvatarCaption,
    AvatarWrapper,
    DropdownButton,
    LogoutButton,
    Wrapper,
} from "./MyAccountStyle";
import { useAuth } from "@components/Auth/useAuth";

const MyAccountMenu = () => {
    const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);

    const { user } = useUser();
    const { handleLogout } = useAuth({});

    const myAccountControllerRef =
        useRef() as React.MutableRefObject<HTMLDivElement>;

    const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

    useOnClickOutside(myAccountControllerRef, () => setVisibleDropdown(false));

    const dropdownItems = useMemo(
        () => [
            <Link to={`/profile/${user?._id}`}>
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
        [user]
    );

    console.log("user: ", user);

    return (
        <Wrapper ref={myAccountControllerRef}>
            <AvatarWrapper>
                <UserAvatarSmall user={user} key={user?.avatar} />
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

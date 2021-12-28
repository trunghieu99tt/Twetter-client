import React, { useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// talons
import { useUser } from "@talons/useUser";
import { useAuth } from "@components/Auth/useAuth";
import { useOnClickOutside } from "@hooks/useOnClickOutside";

// components
import Dropdown from "@components/Dropdown";
import UserAvatarSmall from "@components/UserAvatarSmall";

// icons
import { BsFillCaretDownFill } from "react-icons/bs";
import { RiLogoutBoxRLine, RiAccountCircleFill } from "react-icons/ri";

// styles
import {
    AvatarCaption,
    AvatarWrapper,
    DropdownButton,
    LogoutButton,
    Wrapper,
} from "./MyAccountStyle";
import LanguageSelector from "@components/LanguageSelector";

const MyAccountMenu = () => {
    const { t } = useTranslation();
    const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);

    const { user } = useUser();

    console.log(`user`, user);

    const { handleLogout } = useAuth({});

    const myAccountControllerRef =
        useRef() as React.MutableRefObject<HTMLDivElement>;

    const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

    useOnClickOutside(myAccountControllerRef, () => setVisibleDropdown(false));

    const dropdownItems = useMemo(
        () => [
            <Link to={`/profile/${user?._id}`}>
                <RiAccountCircleFill></RiAccountCircleFill>
                <p>{t("profile")}</p>
            </Link>,
            <LanguageSelector />,
            ...((user?.role === "admin" && [
                <Link to="/users">Go to dashboard</Link>,
            ]) ||
                []),
            <LogoutButton onClick={handleLogout}>
                <RiLogoutBoxRLine></RiLogoutBoxRLine>
                <p>{t("logout")}</p>
            </LogoutButton>,
        ],
        [user]
    );

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

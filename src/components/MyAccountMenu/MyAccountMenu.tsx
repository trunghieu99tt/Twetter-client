import { useAuth } from "@components/Auth/useAuth";
import Dropdown from "@components/Dropdown";
import LanguageSelector from "@components/LanguageSelector";
import UserAvatarSmall from "@components/UserAvatarSmall";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import { useUser } from "@talons/useUser";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillCaretDownFill } from "react-icons/bs";
import { RiAccountCircleFill, RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  AvatarCaption,
  AvatarWrapper,
  DropdownButton,
  LogoutButton,
  Wrapper,
} from "./MyAccountStyle";

const MyAccountMenu = (): JSX.Element => {
  const { t } = useTranslation();
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

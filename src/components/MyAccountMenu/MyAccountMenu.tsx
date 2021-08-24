import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

// talons
import { useOnClickOutside } from "@hooks/useOnClickOutside";

// icons
import { BsFillCaretDownFill } from "react-icons/bs";
import { MdSupervisorAccount } from "react-icons/md";
import { RiLogoutBoxRLine, RiAccountCircleFill } from "react-icons/ri";

// mock data
import { user } from "../../mocks/user.data";

// styles
import {
    Avatar,
    AvatarCaption,
    AvatarWrapper,
    Dropdown,
    DropdownButton,
    DropdownList,
    DropdownListItem,
    LogoutButton,
    Wrapper,
} from "./MyAccountStyle";

const MyAccountMenu = () => {
    const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);

    const myAccountControllerRef =
        useRef() as React.MutableRefObject<HTMLDivElement>;

    const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

    const handleLogout = () => {};

    useOnClickOutside(myAccountControllerRef, () => setVisibleDropdown(false));

    return (
        <Wrapper ref={myAccountControllerRef}>
            <AvatarWrapper>
                <Avatar src={user?.avatar} alt={user.name} />
                <AvatarCaption>{user.name}</AvatarCaption>
                <DropdownButton onClick={toggleDropdown}>
                    <BsFillCaretDownFill />
                </DropdownButton>
            </AvatarWrapper>

            <AnimatePresence>
                {visibleDropdown && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transformOrigin: "top right",
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0,
                        }}
                    >
                        <Dropdown>
                            <DropdownList>
                                <DropdownListItem>
                                    <Link to="/my-profile">
                                        <RiAccountCircleFill></RiAccountCircleFill>
                                        <p>Profile</p>
                                    </Link>
                                </DropdownListItem>
                                <DropdownListItem>
                                    <Link to="/">
                                        <MdSupervisorAccount></MdSupervisorAccount>
                                        <p>Group chat</p>
                                    </Link>
                                </DropdownListItem>
                                <DropdownListItem>
                                    <LogoutButton onClick={handleLogout}>
                                        <RiLogoutBoxRLine></RiLogoutBoxRLine>
                                        <p>Logout</p>
                                    </LogoutButton>
                                </DropdownListItem>
                            </DropdownList>
                        </Dropdown>
                    </motion.div>
                )}
            </AnimatePresence>
        </Wrapper>
    );
};

export default MyAccountMenu;

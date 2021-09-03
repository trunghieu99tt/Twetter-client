import { useState, useEffect } from "react";
import styled from "styled-components";

// images
import DefaultManAvatar from "@images/man.svg";
import DefaultWomanAvatar from "../../assets/images/woman.svg";
import DefaultUnknownAvatar from "@images/user.png";

// types and constants
import { iUser } from "@type/user.types";
import { GENDER } from "constants/user.constants";

const Wrapper = styled.img`
    --size: 2.5rem;
    width: var(--size);
    height: var(--size);
    object-fit: cover;
    border-radius: 0.5rem;
`;

interface Props {
    user?: Partial<iUser>;
}

const UserAvatarSmall = ({ user }: Props) => {
    const [src, setSrc] = useState<any>(user?.avatar || "");

    useEffect(() => {
        const image = document.createElement("img");
        image.src = src;
        image.onerror = () => {
            if (user) {
                let defaultSrc = DefaultUnknownAvatar;
                if (user?.gender !== undefined) {
                    switch (user.gender) {
                        case GENDER.MALE:
                            defaultSrc = DefaultManAvatar;
                            break;
                        case GENDER.FEMALE:
                            defaultSrc = DefaultWomanAvatar;
                            break;
                        default:
                    }
                }
                setSrc(defaultSrc);
            }
        };
    }, [user]);

    return <Wrapper src={src} alt={`${user?.name} avatar`}></Wrapper>;
};

export default UserAvatarSmall;

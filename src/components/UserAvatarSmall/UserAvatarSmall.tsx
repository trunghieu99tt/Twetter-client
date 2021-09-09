import { useState, useEffect } from "react";

// components
import ImageWithPlaceholder from "@components/ImageWithPlaceholder";

// images
import DefaultManAvatar from "@images/man.svg";
import DefaultWomanAvatar from "../../assets/images/woman.svg";
import DefaultUnknownAvatar from "@images/user.png";

// types and constants
import { iUser } from "@type/user.types";
import { GENDER } from "constants/user.constants";

interface Props {
    user: iUser;
}

const UserAvatarSmall = ({ user }: Props) => {
    const [defaultSrc, setDefaultSrc] = useState<any>(user?.avatar || "");

    useEffect(() => {
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
            setDefaultSrc(defaultSrc);
        }
    }, [user]);

    return (
        <ImageWithPlaceholder
            src={user.avatar || ""}
            defaultSrc={defaultSrc}
            alt={`${user.name} avatar`}
            key={user.avatar}
            customStyles="--size: 3rem;
                width: var(--size);
                height: var(--size);
                border-radius: 0.5rem;"
        ></ImageWithPlaceholder>
    );
};

export default UserAvatarSmall;

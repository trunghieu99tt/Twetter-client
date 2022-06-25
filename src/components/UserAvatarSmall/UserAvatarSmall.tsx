import React, { useState, useEffect } from "react";
import ImageWithPlaceholder from "@components/ImageWithPlaceholder";
import DefaultManAvatar from "@images/man.svg";
import DefaultWomanAvatar from "@images/woman.svg";
import DefaultUnknownAvatar from "@images/user.png";
import { iUser } from "@type/user.types";
import { GENDER } from "constants/user.constants";

interface Props {
  user: iUser;
  customStyles?: string;
}

const UserAvatarSmall = ({ user, customStyles }: Props): JSX.Element => {
  const [defaultSrc, setDefaultSrc] = useState<any>(
    user?.avatar || DefaultUnknownAvatar
  );

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
            defaultSrc = DefaultUnknownAvatar;
        }
      }
      setDefaultSrc(defaultSrc);
    }
  }, [user]);

  return (
    <ImageWithPlaceholder
      src={user?.avatar || ""}
      defaultSrc={defaultSrc}
      alt={`${user?.name} avatar`}
      key={user?.avatar}
      customStyles={`--size: 3.5rem;
                width: var(--size);
                height: var(--size);
                border-radius: 0.5rem;
                ${customStyles}
            `}
    ></ImageWithPlaceholder>
  );
};

export default UserAvatarSmall;

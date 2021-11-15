import { useTranslation } from "react-i18next";

// components
import UserAvatarSmall from "@components/UserAvatarSmall";

// icons
import { IoPersonAdd } from "react-icons/io5";

// types
import { iUser } from "@type/user.types";

// styles
import { Flex } from "@shared/style/sharedStyle.style";

// styles
import {
    FollowButton,
    UserBio,
    UserFollowers,
    UserName,
    Wrapper,
} from "./UserCardStyles";
import { useUser } from "@talons/useUser";
import { Link } from "react-router-dom";

interface Props {
    user: iUser;
}

const UserCard = ({ user }: Props) => {
    const { t } = useTranslation();
    const { followUserMutation, user: currentUser } = useUser();

    const followersCount = user.followers ? user.followers.length : 0;

    const followed =
        user.followers &&
        user.followers.some((follower: iUser) => {
            return follower?._id === currentUser?._id;
        });

    const onFollow = () => {
        if (user && user._id) {
            followUserMutation.mutate(user._id);
        }
    };

    return (
        <Wrapper>
            <Flex justify="space-between">
                <Flex gap="1.8rem">
                    <UserAvatarSmall user={user} />
                    <Link to={`/profile/${user._id}`}>
                        <UserName>{user.name}</UserName>
                        <UserFollowers>
                            {followersCount}{" "}
                            {`${t("follower")}${followersCount > 1 ? "s" : ""}`}
                        </UserFollowers>
                    </Link>
                </Flex>
                {user._id !== currentUser?._id && (
                    <FollowButton
                        onClick={onFollow}
                        disabled={followUserMutation.isLoading}
                    >
                        <IoPersonAdd />
                        {followed ? t("followed") : t("follow")}
                    </FollowButton>
                )}
            </Flex>
            <UserBio>{user?.bio}</UserBio>
        </Wrapper>
    );
};

export default UserCard;

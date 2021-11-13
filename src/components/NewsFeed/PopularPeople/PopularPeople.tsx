import { useTranslation } from "react-i18next";

// talons
import { useUser } from "@talons/useUser";

// utils
import { nFormatter } from "@utils/helper";

// components
import SidebarBlock from "@components/Sidebar/SidebarBlock";
import UserAvatarSmall from "@components/UserAvatarSmall";

// types
import { iUser } from "@type/user.types";

// icons
import { IoPersonAdd } from "react-icons/io5";

// styles
import { Flex } from "@shared/style/sharedStyle.style";
import {
    FollowButton,
    UserBio,
    UserCard,
    UserCoverPhoto,
    UserFollowers,
    UserName,
} from "./PopularPeopleStyle";

const PopularPeople = () => {
    const { t } = useTranslation();

    const {
        getLimitedPopularUsersQuery,
        user: currentUser,
        followUserMutation,
    } = useUser();

    const data: iUser[] = getLimitedPopularUsersQuery?.data || [];

    const onToggleFollow = async (userId: string) => {
        await followUserMutation.mutateAsync(userId);
    };

    const filteredUsers =
        (data?.length > 0 &&
            data?.filter((user: iUser) => {
                // Filter user:
                // - if user is not current user
                // - if current user is not following user
                return (
                    user._id !== currentUser?._id &&
                    !user?.followers.some((user: iUser) => {
                        return user._id === currentUser?._id;
                    })
                );
            })) ||
        [];

    if (filteredUsers?.length === 0) return null;

    const items = filteredUsers
        .slice(0, Math.min(filteredUsers.length, 5))
        .map((user: iUser) => {
            const followersCount = user?.followers.length || 0;

            return (
                <UserCard key={`user-card-${user._id}`}>
                    <Flex
                        gap="1.8rem"
                        align="flex-start"
                        justify="space-between"
                    >
                        <Flex gap="1.8rem">
                            <UserAvatarSmall user={user} />
                            <div>
                                <UserName to={`/profile/${user._id}`}>
                                    {user?.name}
                                </UserName>
                                <UserFollowers>
                                    {nFormatter(followersCount)}
                                    {`${t("followers")}${
                                        followersCount > 1 ? "s" : ""
                                    }`}
                                </UserFollowers>
                            </div>
                        </Flex>
                        <FollowButton onClick={() => onToggleFollow(user._id)}>
                            <IoPersonAdd />
                            {t("follow")}
                        </FollowButton>
                    </Flex>
                    <UserBio>{user?.bio}</UserBio>
                    {user?.coverPhoto && (
                        <UserCoverPhoto src={user?.coverPhoto} />
                    )}
                </UserCard>
            );
        });

    return <SidebarBlock title={t("whoToFollow")} content={items} />;
};

export default PopularPeople;

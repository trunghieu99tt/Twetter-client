// talons
import { useUser } from "@talons/useUser";

// utils
import { nFormatter } from "@utils/helper";

// components
import SidebarBlock from "@components/SidebarBlock";
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
    const { getLimitedPopularUsersQuery, user: currentUser } = useUser();

    const data: iUser[] = getLimitedPopularUsersQuery?.data || [];

    const filteredUsers =
        (data?.length > 0 &&
            data?.filter((user: iUser) => {
                // Filter user:
                // - if user is not current user
                // - if current user is not following user
                return (
                    user._id !== currentUser?._id &&
                    !user?.followers.some((u: iUser | string) => {
                        if (typeof u === "string")
                            return u === currentUser?._id;
                        return u._id === currentUser?._id;
                    })
                );
            })) ||
        [];

    if (filteredUsers?.length === 0) return null;

    const items = filteredUsers.map((user: iUser) => {
        return (
            <UserCard>
                <Flex gap="1.8rem">
                    <UserAvatarSmall user={user} />
                    <div>
                        <UserName>{user?.name}</UserName>
                        <UserFollowers>
                            {nFormatter(user?.followers?.length || 0)} followers
                        </UserFollowers>
                    </div>
                    <FollowButton>
                        <IoPersonAdd />
                        Follow
                    </FollowButton>
                </Flex>
                <UserBio>{user?.bio}</UserBio>
                {user?.coverPhoto && <UserCoverPhoto src={user?.coverPhoto} />}
            </UserCard>
        );
    });

    return <SidebarBlock title="Who to follow" content={items} />;
};

export default PopularPeople;

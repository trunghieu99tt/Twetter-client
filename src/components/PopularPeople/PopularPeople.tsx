// talons
import { useUser } from "@talons/useUser";

// utils
import { nFormatter } from "@utils/helper";

// components
import SidebarBlock from "@components/SidebarBlock";
import UserAvatarSmall from "@components/UserAvatarSmall";

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
    const { user } = useUser();

    const items = [...Array(2)].map(() => {
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
                <UserCoverPhoto src={user?.coverPhoto} />
            </UserCard>
        );
    });

    return <SidebarBlock title="Who to follow" content={items} />;
};

export default PopularPeople;

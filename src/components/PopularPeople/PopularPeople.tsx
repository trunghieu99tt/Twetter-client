// utils
import { nFormatter } from "@utils/helper";

// components
import SidebarBlock from "@components/SidebarBlock";

// icons
import { IoPersonAdd } from "react-icons/io5";

// data
import { user } from "../../mocks/user.data";

// styles
import { Flex, UserAvatarSmall } from "@shared/style/sharedStyle.style";
import {
    FollowButton,
    UserBio,
    UserCard,
    UserCoverPhoto,
    UserFollowers,
    UserName,
} from "./PopularPeopleStyle";

const PopularPeople = () => {
    const items = [...Array(2)].map(() => {
        return (
            <UserCard>
                <Flex gap="1.8rem">
                    <UserAvatarSmall src={user?.avatar} alt={user?.name} />
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

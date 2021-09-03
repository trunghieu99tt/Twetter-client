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

interface Props {
    user: iUser;
}

const UserCard = ({ user }: Props) => {
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
                    <div>
                        <UserName>{user.name}</UserName>
                        <UserFollowers>
                            {followersCount}{" "}
                            {followersCount > 1 ? "followers" : "follower"}
                        </UserFollowers>
                    </div>
                </Flex>
                <FollowButton
                    onClick={onFollow}
                    disabled={followUserMutation.isLoading}
                >
                    <IoPersonAdd />
                    {followed ? "Followed" : "Follow"}
                </FollowButton>
            </Flex>
            <UserBio>{user.bio ? user.bio : "No bio available"}</UserBio>
        </Wrapper>
    );
};

export default UserCard;

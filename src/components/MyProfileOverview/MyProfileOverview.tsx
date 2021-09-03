// utils
import { nFormatter } from "@utils/helper";

// talons
import { useUser } from "@talons/useUser";

// icons
import { IoPersonAdd } from "react-icons/io5";

// types
import { iUser } from "@type/user.types";

// styles
import {
    Bio,
    CoverPhoto,
    Main,
    Wrapper,
    AvatarWrapper,
    Avatar,
    Info,
    MainInfo,
    SecondaryInfo,
    FollowButton,
    Name,
    FollowersCounter,
} from "./MyProfileOverviewStyle";
import { Container } from "@shared/style/sharedStyle.style";

type Props = {
    user: iUser;
    isMe: boolean;
};

const MyProfileOverview = ({ user, isMe }: Props) => {
    const { user: currentUser, followUserMutation } = useUser();

    const followed = currentUser?.following.some(
        (u: iUser) => u.id === user.id
    );

    return (
        <Wrapper>
            <CoverPhoto img={user?.coverPhoto || ""}></CoverPhoto>
            <Container>
                <Main>
                    <AvatarWrapper>
                        <Avatar
                            src={user?.avatar || ""}
                            alt={user?.name || "user avatar"}
                        />
                        <div>
                            <label htmlFor={`upload-avatar-${user.id}`} />
                            <input
                                type="file"
                                id={`upload-avatar-${user.id}`}
                                accept="image/*"
                            />
                        </div>
                    </AvatarWrapper>
                    <Info>
                        <MainInfo>
                            <Name>{user?.name}</Name>
                            <FollowersCounter>
                                <span>
                                    {nFormatter(user?.following?.length || 0)}
                                </span>
                                Following
                            </FollowersCounter>
                            <FollowersCounter>
                                <span>
                                    {nFormatter(user?.followers?.length || 0)}
                                </span>
                                Followers
                            </FollowersCounter>
                        </MainInfo>
                        <SecondaryInfo>
                            <Bio>{user?.bio}</Bio>
                        </SecondaryInfo>
                    </Info>
                    {!isMe && (
                        <FollowButton
                            onClick={() => followUserMutation.mutate(user._id)}
                        >
                            <IoPersonAdd />
                            {followUserMutation.isLoading
                                ? "Changing..."
                                : followed
                                ? "Followed"
                                : "Follow"}
                        </FollowButton>
                    )}
                </Main>
            </Container>
        </Wrapper>
    );
};

export default MyProfileOverview;

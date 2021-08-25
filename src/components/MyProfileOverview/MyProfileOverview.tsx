// talons
import { useUser } from "@talons/useUser";

// utils
import { nFormatter } from "@utils/helper";

// icons
import { IoPersonAdd } from "react-icons/io5";

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

// mock data

const MyProfileOverview = () => {
    const { user } = useUser();

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
                    <FollowButton>
                        <IoPersonAdd />
                        Follow
                    </FollowButton>
                </Main>
            </Container>
        </Wrapper>
    );
};

export default MyProfileOverview;

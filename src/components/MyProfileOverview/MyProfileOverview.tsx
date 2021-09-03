import { useState } from "react";

// utils
import { nFormatter } from "@utils/helper";

// talons
import { useUser } from "@talons/useUser";

// components
import Modal from "@components/Modal";
import UserCard from "@components/UserCard";

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

type LIST_TYPE = "followers" | "following" | "";

const MyProfileOverview = ({ user, isMe }: Props) => {
    const { user: currentUser, followUserMutation } = useUser();
    const [listType, setListType] = useState<LIST_TYPE>("");

    const followed = currentUser?.following.some((u: iUser | string) => {
        if (typeof u === "string") {
            return u === user._id;
        }
        return u._id === user._id;
    });

    const followers: iUser[] | string[] = user.followers;
    const following: iUser[] | string[] = user.following;

    let modalData: iUser[] | string[] = [];
    let modalHeader = null;

    switch (listType) {
        case "followers":
            modalData = followers;
            modalHeader = <p>People are following {user.name}</p>;
            break;
        case "following":
            modalData = following;
            modalHeader = <p>{user.name} is following</p>;
            break;
        default:
            modalData = [];
            modalHeader = null;
    }

    const modalBody = modalData.map((u: iUser | string) => (
        <UserCard user={u} />
    ));

    return (
        <Wrapper>
            <Modal
                body={modalBody}
                header={modalHeader}
                isOpen={listType !== ""}
                onCancel={() => setListType("")}
            />
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
                            <FollowersCounter
                                onClick={() => setListType("following")}
                            >
                                <span>
                                    {nFormatter(user?.following?.length || 0)}
                                </span>
                                Following
                            </FollowersCounter>
                            <FollowersCounter
                                onClick={() => setListType("followers")}
                            >
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

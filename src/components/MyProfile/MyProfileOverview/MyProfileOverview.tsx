import React from "react";

// talons
import { useMyProfileOverview } from "./userMyProfileOverview";

// utils
import { nFormatter } from "@utils/helper";

// components
import Modal from "@components/Modal";
import UserCard from "@components/UserCard";

// icons
import { IoPersonAdd } from "react-icons/io5";
import { BiCamera } from "react-icons/bi";

// types
import { iUser } from "@type/user.types";

// styles
import {
    Bio,
    Name,
    Main,
    Info,
    Avatar,
    Wrapper,
    MainInfo,
    CoverPhoto,
    UpdateAvatar,
    FollowButton,
    SecondaryInfo,
    AvatarWrapper,
    FollowersCounter,
    ChangeAvatarActions,
    OkChangeAvatarButton,
    CancelChangeAvatarButton,
} from "./MyProfileOverviewStyle";
import { Container } from "@shared/style/sharedStyle.style";

type Props = {
    user: iUser;
};

const MyProfileOverview = ({ user }: Props) => {
    const {
        isMe,
        newAvatar,
        followed,
        listType,
        modalType,
        isDisabledUpdate,
        updatingFollowStatus,
        followerOrFollowingList,

        closeModal,
        showFollowers,
        showFollowing,
        onChangeAvatar,
        updateUserAvatar,
        updateFollowStatus,
        onCancelChangeAvatar,
    } = useMyProfileOverview({
        user,
    });

    let modalHeader = null;

    switch (listType) {
        case "followers":
            modalHeader = <p>People are following {user.name}</p>;
            break;
        case "following":
            modalHeader = <p>{user.name} is following</p>;
            break;
        default:
            modalHeader = null;
    }

    const modalBody = followerOrFollowingList.map((user: iUser) => (
        <UserCard user={user} />
    ));

    return (
        <Wrapper>
            <Modal
                body={modalBody}
                header={modalHeader}
                isOpen={listType !== ""}
                onCancel={closeModal}
            />
            <CoverPhoto img={user?.coverPhoto || ""}></CoverPhoto>
            <Container>
                <Main>
                    <AvatarWrapper>
                        <Avatar
                            src={newAvatar?.preview || user?.avatar || ""}
                            alt={user?.name || "user avatar"}
                        />
                        <UpdateAvatar>
                            {!newAvatar?.file ? (
                                <React.Fragment>
                                    <label
                                        htmlFor={`upload-avatar-${user._id}`}
                                    >
                                        <BiCamera />
                                        <span>Update your avatar</span>
                                    </label>
                                    <input
                                        type="file"
                                        id={`upload-avatar-${user._id}`}
                                        accept="image/*"
                                        onChange={onChangeAvatar}
                                    />
                                </React.Fragment>
                            ) : (
                                <ChangeAvatarActions>
                                    <OkChangeAvatarButton
                                        onClick={updateUserAvatar}
                                        disabled={isDisabledUpdate}
                                    >
                                        Update
                                    </OkChangeAvatarButton>
                                    <CancelChangeAvatarButton
                                        onClick={onCancelChangeAvatar}
                                        disabled={isDisabledUpdate}
                                    >
                                        Cancel
                                    </CancelChangeAvatarButton>
                                </ChangeAvatarActions>
                            )}
                        </UpdateAvatar>
                    </AvatarWrapper>
                    <Info>
                        <MainInfo>
                            <Name>{user?.name}</Name>
                            <FollowersCounter onClick={showFollowing}>
                                <span>
                                    {nFormatter(user?.following?.length || 0)}
                                </span>
                                Following
                            </FollowersCounter>
                            <FollowersCounter onClick={showFollowers}>
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
                            onClick={() => updateFollowStatus(user?._id)}
                        >
                            <IoPersonAdd />
                            {updatingFollowStatus
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

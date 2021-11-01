import React from "react";

// talons
import { useMyProfileOverview } from "./userMyProfileOverview";

// utils
import { nFormatter } from "@utils/helper";

// components
import EditInfo from "../EditInfo";
import Modal from "@components/Modal";
import UserCard from "@components/UserCard";
import ImageWithUpdater from "@components/ImageWithUpdater";

// icons
import { IoPersonAdd } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";

// types
import { iUser } from "@type/user.types";

// styles
import {
    Bio,
    Name,
    Main,
    Info,
    Wrapper,
    MainInfo,
    CoverPhoto,
    RightButton,
    SecondaryInfo,
    FollowersCounter,
    RightButtons,
    SendMessageBtn,
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
        updating,
        isVisibleEditForm,
        updatingFollowStatus,
        followerOrFollowingList,

        onGoChat,
        closeModal,
        showFollowers,
        showFollowing,
        onChangeAvatar,
        updateUserAvatar,
        updateFollowStatus,
        setIsVisibleEditForm,
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

    let rightButtonContent: any = (
        <React.Fragment>
            <IoPersonAdd />
            {updatingFollowStatus
                ? "Changing..."
                : followed
                ? "Followed"
                : "Follow"}
        </React.Fragment>
    );

    let rightButtonAction = () => updateFollowStatus(user._id);

    if (isMe) {
        rightButtonContent = "Update Info";
        rightButtonAction = () => setIsVisibleEditForm(true);
    }

    return (
        <Wrapper>
            <Modal
                body={modalBody}
                header={modalHeader}
                isOpen={listType !== ""}
                onCancel={closeModal}
            />
            {isVisibleEditForm && (
                <EditInfo
                    data={user}
                    onCancel={() => setIsVisibleEditForm(false)}
                />
            )}
            <CoverPhoto img={user?.coverPhoto || ""}></CoverPhoto>
            <Container>
                <Main>
                    <ImageWithUpdater
                        data={newAvatar}
                        name="coverPhoto"
                        isDisabledUpdate={updating}
                        id={`update-user-avatar-${user._id}`}
                        wrapperCustomStyles="margin-top: -7.5rem;"
                        image={newAvatar?.preview || user?.avatar}
                        onOk={updateUserAvatar}
                        onChange={onChangeAvatar}
                        onCancel={onCancelChangeAvatar}
                    />
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

                    <RightButtons>
                        <RightButton onClick={rightButtonAction}>
                            {rightButtonContent}
                        </RightButton>
                        {!isMe && (
                            <SendMessageBtn onClick={() => onGoChat(user._id)}>
                                <AiOutlineMessage />
                                Send message
                            </SendMessageBtn>
                        )}
                    </RightButtons>
                </Main>
            </Container>
        </Wrapper>
    );
};

export default MyProfileOverview;

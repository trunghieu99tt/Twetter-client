import ImageWithUpdater from "@components/ImageWithUpdater";
import Button from "@components/shared/Button";
import UserCard from "@components/UserCard";
import DefaultManAvatar from "@images/man.svg";
import DefaultUnknownAvatar from "@images/user.png";
import DefaultWomanAvatar from "@images/woman.svg";
import { Container } from "@shared/style/sharedStyle.style";
import { iUser } from "@type/user.types";
import { nFormatter } from "@utils/helper";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineMessage } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import EditInfo from "../EditInfo";
import {
  Bio,
  Birthday,
  CoverPhoto,
  FollowersCounter,
  Info,
  Main,
  MainInfo,
  Name,
  RightButtons,
  SecondaryInfo,
  UserName,
  Wrapper,
} from "./MyProfileOverviewStyle";
import { useMyProfileOverview } from "./useMyProfileOverview";
const Modal = React.lazy(() => import("@components/Modal"));

type Props = {
  user: iUser;
};

const MyProfileOverview = ({ user }: Props) => {
  const { t } = useTranslation();

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
    reportUser,
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
      modalHeader = (
        <p>
          {t("peopleAreFollowing")} {user.name}
        </p>
      );
      break;
    case "following":
      modalHeader = (
        <p>
          {user.name} {t("peopleUserFollowing")}
        </p>
      );
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
        ? `${t("changing")}..`
        : followed
        ? t("followed")
        : t("follow")}
    </React.Fragment>
  );

  let rightButtonAction = () => updateFollowStatus(user._id);

  if (isMe) {
    rightButtonContent = t("updateInfo");
    rightButtonAction = () => setIsVisibleEditForm(true);
  }

  let defaultAvatar = null;

  switch (user.gender) {
    case 0:
      defaultAvatar = DefaultManAvatar;
      break;
    case 1:
      defaultAvatar = DefaultWomanAvatar;
      break;
    default:
      defaultAvatar = DefaultUnknownAvatar;
  }

  return (
    <Wrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <Modal
          body={modalBody}
          header={modalHeader}
          isOpen={listType !== ""}
          onCancel={closeModal}
        />
      </Suspense>
      {isVisibleEditForm && (
        <EditInfo data={user} onCancel={() => setIsVisibleEditForm(false)} />
      )}
      <CoverPhoto img={user?.coverPhoto || ""}></CoverPhoto>
      <Container>
        <Main>
          <ImageWithUpdater
            shouldHaveUpdate={isMe}
            data={newAvatar}
            name="coverPhoto"
            label={t("updateYourAvatar")}
            isDisabledUpdate={updating}
            id={`update-user-avatar-${user._id}`}
            wrapperCustomStyles="margin-top: -7.5rem;"
            image={newAvatar?.preview || user?.avatar || defaultAvatar}
            onOk={updateUserAvatar}
            onChange={onChangeAvatar}
            onCancel={onCancelChangeAvatar}
          />
          <Info>
            <MainInfo>
              <Name>{user?.name}</Name>
              <FollowersCounter onClick={showFollowing}>
                <span>{nFormatter(user?.following?.length || 0)}</span>
                {t("following")}
              </FollowersCounter>
              <FollowersCounter onClick={showFollowers}>
                <span>{nFormatter(user?.followers?.length || 0)}</span>
                {t("follower")}
              </FollowersCounter>
            </MainInfo>
            <SecondaryInfo>
              <UserName>@{user?.username}</UserName>
              <Bio>{user?.bio}</Bio>
              <Birthday>
                <FaBirthdayCake />{" "}
                {user?.birthday && new Date(user.birthday).toLocaleDateString()}
              </Birthday>
            </SecondaryInfo>
          </Info>

          <RightButtons>
            <Button onClick={rightButtonAction}>{rightButtonContent}</Button>
            {!isMe && (
              <React.Fragment>
                <Button onClick={() => onGoChat(user._id)}>
                  <AiOutlineMessage />
                  {t("sendMessage")}
                </Button>
                <Button onClick={reportUser}>
                  <AiOutlineMessage />
                  {t("reportUser")}
                </Button>
              </React.Fragment>
            )}
          </RightButtons>
        </Main>
      </Container>
    </Wrapper>
  );
};

export default MyProfileOverview;

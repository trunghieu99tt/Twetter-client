import UserAvatarSmall from "@components/UserAvatarSmall";
import { Flex } from "@shared/style/sharedStyle.style";
import { iUser } from "@type/user.types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { UserBio, UserFollowers, UserName, Wrapper } from "./UserCardStyles";

interface Props {
  user: iUser;
}

const UserCard = ({ user }: Props) => {
  const { t } = useTranslation();

  const followersCount = user.followers ? user.followers.length : 0;

  return (
    <Wrapper>
      <Flex justify="space-between">
        <Flex gap="1.8rem">
          <UserAvatarSmall user={user} />
          <Link to={`/profile/${user._id}`}>
            <UserName>{user.name}</UserName>
            <UserFollowers>
              {followersCount}{" "}
              {`${t("follower")}${followersCount > 1 ? "s" : ""}`}
            </UserFollowers>
          </Link>
        </Flex>
      </Flex>
      <UserBio>{user?.bio}</UserBio>
    </Wrapper>
  );
};

export default UserCard;

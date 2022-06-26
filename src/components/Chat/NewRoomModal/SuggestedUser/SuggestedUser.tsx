import UserAvatarSmall from "@components/UserAvatarSmall";
import { iUser } from "@type/user.types";
import mergeClasses from "@utils/mergeClasses";
import { memo } from "react";
import defaultClasses from "./suggestedUser.module.css";
import cn from "classnames";
import { TiTickOutline } from "react-icons/ti";

type Props = {
  user: iUser;
  classes?: any;
  isSelected: boolean;
  onClick: (user: iUser) => (event: any) => void;
};

const SuggestedUser = ({
  user,
  onClick,
  classes: propsClasses,
  isSelected,
}: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  return (
    <article
      className={classes.suggestedUser}
      onClick={onClick(user)}
      key={`suggested-user-${user._id}`}
    >
      <UserAvatarSmall user={user} />
      <div className={classes.suggestedUserInfo}>
        <div className={classes.main}>
          <p className={classes.suggestedUserName}>{user.name}</p>
          <p className={classes.suggestedUserEmail}>{user.email}</p>
          <p className={classes.suggestedUserUsername}>@{user.username}</p>
        </div>
        <button
          className={cn(classes.tick, {
            [classes.active]: isSelected,
          })}
        >
          {isSelected && <TiTickOutline />}
        </button>
      </div>
    </article>
  );
};

export default memo(SuggestedUser, (prevProps, nextProps) => {
  return (
    prevProps.user._id === nextProps.user._id &&
    prevProps.isSelected === nextProps.isSelected
  );
});

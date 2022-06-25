import UserAvatarSmall from "@components/UserAvatarSmall";
import { useUser } from "@talons/useUser";
import { iUser } from "@type/user.types";
import { debounce } from "lodash";
import React, { Suspense, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserService } from "services/user.service";
import classes from "./addUserToRoom.module.css";
import { TiTickOutline } from "react-icons/ti";
import Button from "@components/shared/Button";
import Modal from "@components/Modal";

type Props = {
  members: iUser[];
  onCloseAddMember: () => void;
  onAddUser: (users: iUser[]) => void;
};

const AddUserToRoom = ({
  onAddUser,
  members,
  onCloseAddMember,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const { user: currentUser } = useUser();
  const [suggestions, setSuggestions] = useState<iUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<iUser[]>([]);

  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      const data = await UserService.searchUser(value);
      const filteredUsers = data.filter(
        (user: iUser) =>
          !members.some((member: iUser) => member._id === user._id) &&
          user._id !== currentUser._id
      );
      setSuggestions(filteredUsers);
    }, 500),
    []
  );

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const toggleAddingToSelectedUsers = useCallback(
    (user: iUser) => (event: any) => {
      if (
        selectedUsers.some(
          (selectedUser: iUser) => selectedUser._id === user._id
        )
      ) {
        setSelectedUsers(
          selectedUsers.filter(
            (selectedUser: iUser) => selectedUser._id !== user._id
          )
        );
      } else {
        setSelectedUsers([...selectedUsers, user]);
      }
    },
    []
  );

  const addUsersToMemberList = () => {
    onAddUser(selectedUsers);
  };

  const body = (
    <div className={classes.addUserForm}>
      <label htmlFor="user" className={classes.inputLabel}>
        {t("addUser")}
      </label>
      <input
        className={classes.input}
        type="text"
        name="user"
        id="user"
        onFocus={search}
        onChange={search}
        placeholder={t("addUser")}
      />
      {suggestions?.length > 0 && (
        <div className={classes.userSuggestionList}>
          {suggestions?.map((user: iUser) => {
            const isSelected = selectedUsers.some(
              (selectedUser: iUser) => selectedUser._id === user._id
            );

            return (
              <article>
                <UserAvatarSmall user={user} />
                <div>
                  <div>
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                    <span>@{user.username}</span>
                  </div>
                  <button
                    className={classes.userSuggestion}
                    onClick={toggleAddingToSelectedUsers(user)}
                  >
                    {isSelected && <TiTickOutline />}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
      <Button className={classes.addUserButton} onClick={addUsersToMemberList}>
        {t("add")}
      </Button>
    </div>
  );

  const props = {
    body,
    isOpen: true,
    onCancel: onCloseAddMember,
    onOk: addUsersToMemberList,
    header: <p>{t("addMember")}</p>,
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Modal {...props} />
    </Suspense>
  );
};

export default AddUserToRoom;

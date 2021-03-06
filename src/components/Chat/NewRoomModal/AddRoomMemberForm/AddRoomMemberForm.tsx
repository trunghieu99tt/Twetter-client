import Modal from "@components/Modal";
import Input from "@components/shared/Input";
import { useUser } from "@talons/useUser";
import { iUser } from "@type/user.types";
import { debounce } from "lodash";
import React, { Suspense, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserService } from "services/user.service";
import SuggestedUser from "../SuggestedUser";
import classes from "./addRoomMemberForm.module.css";

type Props = {
  members: iUser[];
  onCloseAddMember: () => void;
  onAddUser: (users: iUser[]) => void;
};

const AddRoomMemberForm = ({
  onAddUser,
  members,
  onCloseAddMember,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const { user: currentUser } = useUser();
  const [suggestions, setSuggestions] = useState<iUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<iUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      setLoading(true);
      const data = await UserService.searchUser(value);
      const filteredUsers = data.filter(
        (user: iUser) =>
          !members.some((member: iUser) => member._id === user._id) &&
          user._id !== currentUser._id
      );
      setSuggestions(filteredUsers);
      setLoading(false);
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
        setSelectedUsers((prev) =>
          prev.filter((selectedUser: iUser) => selectedUser._id !== user._id)
        );
      } else {
        setSelectedUsers((prev) => [...prev, user]);
      }
    },
    [selectedUsers]
  );

  const addUsersToMemberList = () => {
    onAddUser(selectedUsers);
    onCloseAddMember();
  };

  const body = (
    <div className={classes.root}>
      <div className={classes.inputForm}>
        <label htmlFor="user" className={classes.inputLabel}>
          {t("search")}
        </label>
        <Input
          type="text"
          name="user"
          id="user"
          onFocus={search}
          onChange={search}
          placeholder={t("search")}
        />
      </div>
      {loading && <div className={classes.loading}>{t("loading")}</div>}
      {suggestions?.length > 0 && (
        <div className={classes.userSuggestionList}>
          {suggestions?.map((user: iUser) => {
            const isSelected = selectedUsers.some(
              (selectedUser: iUser) => selectedUser._id === user._id
            );

            return (
              <SuggestedUser
                user={user}
                isSelected={isSelected}
                onClick={toggleAddingToSelectedUsers}
              />
            );
          })}
        </div>
      )}
    </div>
  );

  const props = {
    body,
    isOpen: true,
    onCancel: onCloseAddMember,
    onOk: addUsersToMemberList,
    header: <p>{t("formTitle.addRoomMember")}</p>,
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Modal {...props} />
    </Suspense>
  );
};

export default AddRoomMemberForm;

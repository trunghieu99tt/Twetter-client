import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

// talons
import { useNewRoomModal } from "./useNewRoomModal";

// components
const Modal = React.lazy(() => import("@components/Modal"));

// icons
import { BsCardImage } from "react-icons/bs";

// types
import { iUser } from "@type/user.types";

import classes from "./newRoomModal.module.css";
import { Spinner1 } from "@components/Loaders";

const CreateNewGroupChat = () => {
  const { t } = useTranslation();

  const {
    media,
    loading,
    suggestion,
    newGroupChatUserList,

    onChange,
    onCloseModal,
    onCreateNewChatGroup,
    onAddToNewGroupUserList,
    onRemoveUserFromNewGroupUserList,
  } = useNewRoomModal();

  const body = (
    <div className={classes.newGroupChat}>
      <div className={classes.inputGroup}>
        <label htmlFor="groupName" className={classes.inputLabel}>
          {t("groupChatName")}
        </label>
        <input
          onChange={onChange}
          type="text"
          name="name"
          id="groupName"
          placeholder={t("groupChatName")}
          className={classes.input}
        />
      </div>

      <div className={classes.inputGroup}>
        <label htmlFor="groupChatDescription" className={classes.inputLabel}>
          {t("groupChatDescription")}
        </label>
        <input
          onChange={onChange}
          type="text"
          name="description"
          id="groupChatDescription"
          placeholder={t("groupChatDescription")}
          className={classes.input}
        />
      </div>
      <div className={classes.addUserForm}>
        <label htmlFor="user" className={classes.inputLabel}>
          {t("addUser")}
        </label>
        <input
          className={classes.input}
          type="text"
          name="user"
          id="user"
          onChange={onChange}
          placeholder={t("addUser")}
        />
        <button className={classes.addUserButton}>{t("add")}</button>
        {suggestion?.length > 0 && (
          <div className={classes.userSuggestionList}>
            {suggestion?.map((user: iUser) => {
              return (
                <button
                  className={classes.userSuggestion}
                  onClick={() => onAddToNewGroupUserList(user)}
                >
                  {user.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div className={classes.groupChatUserList}>
        {newGroupChatUserList?.map((user: iUser) => {
          return (
            <article className={classes.groupChatUserItem}>
              {user.name}
              <button onClick={() => onRemoveUserFromNewGroupUserList(user)}>
                x
              </button>
            </article>
          );
        })}
      </div>
      <div className={classes.inputGroup}>
        <input type="file" name="image" id="newRoomImage" onChange={onChange} />
        <label htmlFor="newRoomImage" className={classes.fileBtn}>
          {t("roomImage")}
          <BsCardImage />
        </label>
        {media?.url && (
          <figure className="mt-3">
            <img
              src={media.url}
              alt="new-room-photo"
              className={classes.roomImagePreview}
              loading="lazy"
            />
          </figure>
        )}
      </div>
    </div>
  );

  return (
    <React.Fragment>
      {loading && <Spinner1 />}
      <Suspense fallback={<div>Loading...</div>}>
        <Modal
          body={body}
          isOpen={true}
          onCancel={onCloseModal}
          onOk={onCreateNewChatGroup}
          header={<p>{t("createNewGroupChat")}</p>}
        />
      </Suspense>
    </React.Fragment>
  );
};

export default CreateNewGroupChat;

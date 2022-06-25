import { Spinner1 } from "@components/Loaders";
import { iUser } from "@type/user.types";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { BsCardImage } from "react-icons/bs";
import AddUserToRoom from "./AddUserToRoomForm";
import classes from "./newRoomModal.module.css";
import { useNewRoomModal } from "./useNewRoomModal";
const Modal = React.lazy(() => import("@components/Modal"));

const NewRoomModal = () => {
  const { t } = useTranslation();

  const {
    media,
    loading,
    isAddMemberForOpened,
    newGroupChatUserList,

    onChange,
    onCloseModal,
    onCreateNewChatGroup,
    onCloseAddMemberModal,
    onOpenAddMemberModal,
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
      <div className={classes.inputGroup}>
        <label htmlFor="groupChatDescription" className={classes.inputLabel}>
          {t("addMember")}
        </label>
      </div>
      {isAddMemberForOpened && (
        <AddUserToRoom
          members={newGroupChatUserList}
          onCloseAddMember={onCloseAddMemberModal}
          onAddUser={onAddToNewGroupUserList}
        />
      )}
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

export default NewRoomModal;

import { useState, useEffect } from "react";

// Store
import { modalUserAction } from "../../store/slice/modalUser";
import { useSelector, useDispatch } from "react-redux";

import { UserPhoto } from "../UserPhoto";
import photo from "../../img/userIcon.svg";
import { InputPage } from "../InputPage";

// Style
import styles from "./PageUser.module.scss";

// Thunk
import { updateUserDataThunk } from "../../store/thunk/updateUserDataThunk";

// Firebase
import { auth } from "../../firebase";

const PageUser = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [fullName, setFullName] = useState("");
  const [showBtnClose, setShowBtnClose] = useState(false);

  const { uidForShowUserPage, editDisabled } = useSelector(
    (state) => state.modalUser
  );

  const { userData, usersData } = useSelector((state) => state.userDB);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalUserAction.setShowModal(false));
    dispatch(modalUserAction.setUIDForShowUserPage(""));
  };

  const saveNewDataForInput = (e) => {
    const dataId = e.target.dataset["id"];
    const copyObj = JSON.parse(JSON.stringify(currentUser));

    // Контроль импута с именем
    if (dataId === "fullName") {
      const splitFullName = e.target.value.split(" ");
      if (splitFullName.length > 2) {
        return;
      }
      setFullName(e.target.value);
      copyObj.firstName = splitFullName[0] || "";
      copyObj.lastName = splitFullName[1] || "";
      setCurrentUser({ ...copyObj });
      return;
    }
    //

    copyObj[dataId] = e.target.value;
    setCurrentUser({ ...copyObj });
  };

  const toggleEditModal = () => {
    dispatch(modalUserAction.toggleEdit());
    if (!editDisabled) {
      dispatch(updateUserDataThunk(currentUser));
    }
  };

  useEffect(() => {
    if (uidForShowUserPage) {
      setCurrentUser(usersData[uidForShowUserPage]);
      setFullName(
        `${usersData[uidForShowUserPage]?.firstName} ${usersData[uidForShowUserPage]?.lastName}`
      );
      return;
    }
    if (userData) {
      dispatch(modalUserAction.setUIDForShowUserPage(userData.uid));
      return;
    }
  }, [uidForShowUserPage, usersData, userData, dispatch]);

  useEffect(() => {
    if (!uidForShowUserPage) {
      setShowBtnClose(true);
      return;
    }
    if (auth?.currentUser?.uid === uidForShowUserPage) {
      setShowBtnClose(true);
      return;
    }
    setShowBtnClose(false);
  }, [uidForShowUserPage]);

  return (
    <>
      {showBtnClose && (
        <button
          className={editDisabled ? styles.btnEdit : styles.btnSaveEdit}
          onClick={toggleEditModal}
        />
      )}
      {editDisabled && (
        <button className={styles.btnClose} onClick={closeModal} />
      )}
      <div className={styles.headerUserPanel}>
        {currentUser && (
          <>
            <UserPhoto
              size="l"
              src={currentUser.urlAvatar || photo}
              uid={currentUser.uid}
            />

            <div className={styles.wrapper}>
              <InputPage
                disabled={editDisabled}
                mode="withoutLabel"
                color="light"
                text={fullName}
                onChange={saveNewDataForInput}
                data-id="fullName"
              />

              <InputPage
                disabled={true}
                mode="withoutLabel"
                color="dark"
                text={currentUser?.email}
                onChange={saveNewDataForInput}
                data-id="email"
                linkTo={`mailto:${currentUser?.email}`}
              />
            </div>
          </>
        )}
      </div>
      <hr />
      <div className={styles.mainUserPanel}>
        {currentUser && (
          <>
            <InputPage
              disabled={editDisabled}
              mode="withLabel"
              text={currentUser?.department}
              label="Отдел:"
              onChange={saveNewDataForInput}
              data-id="department"
            />
            <InputPage
              disabled={editDisabled}
              mode="withLabel"
              text={currentUser?.phoneNumber}
              label="Телефон:"
              onChange={saveNewDataForInput}
              data-id="phoneNumber"
              linkTo={`tel:${currentUser?.phoneNumber}`}
            />
            <InputPage
              disabled={editDisabled}
              mode="withLabel"
              text={currentUser?.position}
              label="Должность:"
              onChange={saveNewDataForInput}
              data-id="position"
            />
          </>
        )}
      </div>
    </>
  );
};

export { PageUser };

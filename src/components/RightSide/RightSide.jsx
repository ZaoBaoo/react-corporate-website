import { useEffect, useState } from "react";

// Store
import { useSelector, useDispatch } from "react-redux";
import { modalUserAction } from "../../store/slice/modalUser";

// Components
import { UserPhoto } from "../UserPhoto";
import styles from "./RightSide.module.scss";
import photo from "../../img/userIcon.png";
import { InputPage } from "../InputPage";

const RightSide = () => {
  const [currentUser, setCurrentUser] = useState("");

  const { uidForShow, editDisabled } = useSelector((state) => state.modalUser);
  const { userData, usersData } = useSelector((state) => state.userDB);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalUserAction.setShowModal(false));
    dispatch(modalUserAction.setUID(""));
  };

  const saveNewDataForInput = (e) => {
    const dataId = e.target.dataset["id"];
    const copyObj = JSON.parse(JSON.stringify(currentUser));
    copyObj[dataId] = e.target.value;
    setCurrentUser({ ...copyObj });
  };

  const toggleEditModal = () => {
    dispatch(modalUserAction.toggleEdit());
  };

  useEffect(() => {
    console.log("render");
    if (uidForShow) {
      setCurrentUser(usersData[uidForShow]);
      return;
    }
    if (userData) {
      setCurrentUser(userData);
      return;
    }
  }, [uidForShow, usersData, userData]);

  return (
    <>
      <div className={styles.rightSide} style={{ pointerEvents: "auto" }}>
        <div className={styles.userPanel}>
          <button
            className={editDisabled ? styles.btnEdit : styles.btnSaveEdit}
            onClick={toggleEditModal}
          />
          {editDisabled && (
            <button className={styles.btnClose} onClick={closeModal} />
          )}
          <div className={styles.headerUserPanel}>
            <UserPhoto size="l" src={photo} />
            {currentUser && (
              <div className={styles.wrapper}>
                <InputPage
                  disabled={editDisabled}
                  mode="withoutLabel"
                  color="light"
                  text={`${currentUser?.firstName} ${currentUser?.lastName}`}
                  onChange={saveNewDataForInput}
                  data-id="fullName"
                />

                <InputPage
                  disabled={editDisabled}
                  mode="withoutLabel"
                  color="dark"
                  text={currentUser?.email}
                  onChange={saveNewDataForInput}
                  data-id="email"
                />
              </div>
            )}
          </div>
          <hr />
          <div className={styles.mainUserPanel}>
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
            />
            <InputPage
              disabled={editDisabled}
              mode="withLabel"
              text={currentUser?.position}
              label="Должность:"
              onChange={saveNewDataForInput}
              data-id="position"
            />
            <InputPage
              disabled={editDisabled}
              mode="withLabel"
              text=""
              label="Статус работника:"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { RightSide };

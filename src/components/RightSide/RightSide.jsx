import { useEffect, useState } from "react";

// Store
import { useSelector, useDispatch } from "react-redux";
import { modalUserAction } from "../../store/slice/modalUser";

// Components
import { UserPhoto } from "../UserPhoto";
import styles from "./RightSide.module.scss";
import photo from "../../img/userIcon.png";
import { InputPage } from "../InputPage";

// Thunk
import { updateUserDataThunk } from "../../store/thunk/updateUserDataThunk";

// Firebase
import { auth } from "../../firebase";

const RightSide = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [fullName, setFullName] = useState("");

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
    if (uidForShow) {
      setCurrentUser(usersData[uidForShow]);
      setFullName(
        `${usersData[uidForShow]?.firstName} ${usersData[uidForShow]?.lastName}`
      );
      return;
    }
    if (userData) {
      setCurrentUser(userData);
      setFullName(`${userData?.firstName} ${userData?.lastName}`);
      return;
    }
  }, [uidForShow, usersData, userData]);

  // TEST
  useEffect(() => {
    if (uidForShow === auth?.currentUser?.uid) {
      console.log("Наша страница");
    }
  }, [uidForShow]);

  return (
    <>
      <div className={styles.rightSide} style={{ pointerEvents: "auto" }}>
        <div className={styles.userPanel}>
          {uidForShow === auth?.currentUser?.uid && (
            <button
              className={editDisabled ? styles.btnEdit : styles.btnSaveEdit}
              onClick={toggleEditModal}
            />
          )}
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
                  text={fullName}
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
                />
                <InputPage
                  disabled={editDisabled}
                  mode="withLabel"
                  text={currentUser?.position}
                  label="Должность:"
                  onChange={saveNewDataForInput}
                  data-id="position"
                />
                {/* <InputPage
                disabled={editDisabled}
                mode="withLabel"
                text=""
                label="Статус работника:"
              /> */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { RightSide };

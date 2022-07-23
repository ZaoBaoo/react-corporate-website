import { useEffect, useState } from "react";

// Animate
import { motion, AnimatePresence } from "framer-motion";

// Store
import { useSelector, useDispatch } from "react-redux";
import { modalUserAction } from "../../store/slice/modalUser";

// Components
import { UserPhoto } from "../UserPhoto";
import styles from "./RightSide.module.scss";
// import photo from "../../img/userIcon.png";
import photo from "../../img/userIcon.svg";
import { InputPage } from "../InputPage";

// Thunk
import { updateUserDataThunk } from "../../store/thunk/updateUserDataThunk";

// Firebase
import { auth } from "../../firebase";

const pVariants = {
  hidden: {
    opacity: 0,
    x: -500,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 500,
  },
};

const RightSide = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [fullName, setFullName] = useState("");
  const [showBlock, setshowBlock] = useState(true);
  const [showBtnClose, setShowBtnClose] = useState(false);

  const { uidForShow, editDisabled } = useSelector((state) => state.modalUser);
  const { userData, usersData } = useSelector((state) => state.userDB);
  const { isMobileSize } = useSelector((state) => state.mobile);

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

  useEffect(() => {
    if (uidForShow && !isMobileSize) {
      setshowBlock(!showBlock);
      setTimeout(() => {
        setshowBlock(showBlock);
      }, 400);
    }
  }, [uidForShow]);

  useEffect(() => {
    if (!uidForShow) {
      setShowBtnClose(true);
      return;
    }
    if (auth?.currentUser?.uid === uidForShow) {
      setShowBtnClose(true);
      return;
    }
    setShowBtnClose(false);
  }, [uidForShow]);

  return (
    <>
      <div className={styles.rightSide} style={{ pointerEvents: "auto" }}>
        <AnimatePresence initial={false}>
          {showBlock && (
            <motion.div
              className={styles.userPanel}
              initial={"hidden"}
              animate={"visible"}
              exit="exit"
              transition={{ duration: 0.2 }}
              variants={pVariants}
            >
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
                    {/* <InputPage
                disabled={editDisabled}
                mode="withLabel"
                text=""
                label="Статус работника:"
              /> */}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export { RightSide };

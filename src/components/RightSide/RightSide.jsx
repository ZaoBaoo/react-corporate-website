// Store
import { useSelector, useDispatch } from "react-redux";
import { modalUserAction } from "../../store/slice/modalUser";

// Components
import { UserPhoto } from "../UserPhoto";
import styles from "./RightSide.module.scss";
import photo from "../../img/userIcon.png";
import { InputPage } from "../InputPage";

const RightSide = () => {
  const { userForShow } = useSelector((state) => state.modalUser);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalUserAction.setShowModal(false));
    dispatch(modalUserAction.setUserForShow(""));
  };

  return (
    <>
      <div className={styles.rightSide}>
        <div className={styles.userPanel}>
          <button className={styles.btnEdit} />
          <button className={styles.btnClose} onClick={closeModal} />
          <div className={styles.headerUserPanel}>
            <UserPhoto size="l" src={photo} />
            {userForShow && (
              <div className={styles.wrapper}>
                <InputPage
                  disabled={true}
                  mode="withoutLabel"
                  color="light"
                  text={`${userForShow?.firstName} ${userForShow?.lastName}`}
                />

                <InputPage
                  disabled={true}
                  mode="withoutLabel"
                  color="dark"
                  text={userForShow.email}
                />
              </div>
            )}
          </div>
          <hr />
          <div className={styles.mainUserPanel}>
            <InputPage
              disabled={true}
              mode="withLabel"
              text="Макетинг"
              label="Отдел:"
            />
            <InputPage
              disabled={true}
              mode="withLabel"
              text={userForShow.phoneNumber}
              label="Телефон:"
            />
            <InputPage
              disabled={true}
              mode="withLabel"
              text="-"
              label="Должность:"
            />
            <InputPage
              disabled={true}
              mode="withLabel"
              text="-"
              label="Статус работника:"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { RightSide };

// Store
import { useSelector, useDispatch } from "react-redux";
import { modalUserAction } from "../../store/slice/modalUser";

// Components
import { UserPhoto } from "../UserPhoto";
import styles from "./RightSide.module.scss";
import photo from "../../img/userIcon.png";
import { InputPage } from "../InputPage";

const RightSide = () => {
  const { userData } = useSelector((state) => state.userDB);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalUserAction.setShowModal(false));
    dispatch(modalUserAction.setUidForShow(""));
  };

  return (
    <>
      <div className={styles.rightSide}>
        <div className={styles.userPanel}>
          <button className={styles.btnEdit} />
          <button className={styles.btnClose} onClick={closeModal} />
          <div className={styles.headerUserPanel}>
            <UserPhoto size="l" src={photo} />
            {userData && (
              <div className={styles.wrapper}>
                <InputPage
                  disabled={true}
                  mode="withoutLabel"
                  color="light"
                  text={`${userData?.firstName} ${userData?.lastName}`}
                />

                <InputPage
                  disabled={true}
                  mode="withoutLabel"
                  color="dark"
                  text={userData.email}
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
              text="Макетинг"
              label="Телефон:"
            />
            <InputPage
              disabled={true}
              mode="withLabel"
              text="Макетинг"
              label="Должность:"
            />
            <InputPage
              disabled={true}
              mode="withLabel"
              text="Макетинг"
              label="Статус работника:"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { RightSide };

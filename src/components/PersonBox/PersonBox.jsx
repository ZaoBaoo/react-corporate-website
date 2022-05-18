// Store
import { useDispatch } from "react-redux";
import { modalUserAction } from "../../store/slice/modalUser";

// Components
import miniUserIcon from "../../img/miniUserIcon.png";
import messageIcon from "../../img/messageIcon.svg";

// Style
import styles from "./PersonBox.module.scss";

const PersonBox = ({ firstName, lastName, department, uid }) => {
  const dispatch = useDispatch();

  const showUserInModal = () => {
    dispatch(modalUserAction.setShowModal(true));
    dispatch(modalUserAction.setUidForShow(uid));
  };
  return (
    <div className={styles.personBox}>
      <div className={styles.infoUser} onClick={showUserInModal}>
        <div className={styles.imgUser}>
          <img src={miniUserIcon} alt="" />
        </div>
        <div className={styles.infoName}>
          <span>{`${firstName} ${lastName}`}</span>
          <div className={styles.infoDepartment}>{department}</div>
        </div>
      </div>
      <img src={messageIcon} alt="" className={styles.messageUserIcon} />
    </div>
  );
};

export { PersonBox };
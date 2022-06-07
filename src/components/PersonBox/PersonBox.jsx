// Store
import { useDispatch, useSelector } from "react-redux";
import { modalUserAction } from "../../store/slice/modalUser";

// Components
import miniUserIcon from "../../img/miniUserIcon.png";
import messageIcon from "../../img/messageIcon.svg";
import { UserPhoto } from "../UserPhoto";

// Style
import styles from "./PersonBox.module.scss";

const PersonBox = ({ firstName, lastName, department, uid }) => {
  const { isMobileSize } = useSelector((state) => state.mobile);
  const dispatch = useDispatch();

  const showUserInModal = () => {
    if (isMobileSize) {
      dispatch(modalUserAction.setShowModal(true));
      dispatch(modalUserAction.setUidForShow(uid));
    }
  };

  return (
    <div className={styles.personBox}>
      <div className={styles.infoUser} onClick={showUserInModal}>
        <UserPhoto size="s" src={miniUserIcon} />

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

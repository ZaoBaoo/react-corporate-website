// Animate
import { motion } from "framer-motion";

// Store
import { useDispatch, useSelector } from "react-redux";
import { modalUserAction } from "../../store/slice/modalUser";

// Components
import photo from "../../img/userIcon.svg";
import messageIcon from "../../img/messageIcon.svg";
import { UserPhoto } from "../UserPhoto";

// Style
import styles from "./PersonBox.module.scss";

const PersonBox = ({
  firstName,
  lastName,
  department,
  uid,
  urlAvatar,
  ...animate
}) => {
  const { isMobileSize } = useSelector((state) => state.mobile);

  const dispatch = useDispatch();

  const showUserInModal = () => {
    if (isMobileSize) {
      dispatch(modalUserAction.setShowModal(true));
      dispatch(modalUserAction.setUIDForShowUserPage(uid));
      return;
    }
    dispatch(modalUserAction.setUIDForShowChat(""));
    dispatch(modalUserAction.setUIDForShowUserPage(uid));
  };

  const showChatInModal = () => {
    if (isMobileSize) {
      dispatch(modalUserAction.setShowModal(true));
      dispatch(modalUserAction.setUIDForShowChat(uid));
      return;
    }
    dispatch(modalUserAction.setUIDForShowChat(uid));
  };

  return (
    <motion.div className={styles.personBox} {...animate}>
      <motion.div
        className={styles.infoUser}
        onClick={showUserInModal}
        initial={{ x: 0 }}
        whileHover={{ x: "0.5rem" }}
      >
        <UserPhoto size="s" src={urlAvatar || photo} />

        <div className={styles.infoName}>
          <span>{`${firstName} ${lastName}`}</span>
          <div className={styles.infoDepartment}>{department}</div>
        </div>
      </motion.div>
      <img
        onClick={showChatInModal}
        src={messageIcon}
        alt=""
        className={styles.messageUserIcon}
      />
    </motion.div>
  );
};

export { PersonBox };

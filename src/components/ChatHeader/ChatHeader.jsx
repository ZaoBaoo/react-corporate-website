import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalUserAction } from "../../store/slice/modalUser";

// Styles
import styles from "./ChatHeader.module.scss";

// img
import closeImg from "../../img/chatCloseIcon.svg";
import defaultImg from "../../img/userIcon.svg";

const ChatHeader = () => {
  const [user, setUser] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);

  const dispatch = useDispatch();

  const { uidForShowChat } = useSelector((state) => state.modalUser);
  const { usersData } = useSelector((state) => state.userDB);

  const closeChat = () => {
    dispatch(modalUserAction.setUIDForShowChat(""));
    dispatch(modalUserAction.setShowModal(false));
  };

  useEffect(() => {
    if (usersData && uidForShowChat) {
      const userData = usersData[uidForShowChat];
      const userName = `${userData.firstName} ${userData.lastName}`;
      setUser(userName);
      setUserPhoto(userData.urlAvatar);
    }
  }, [usersData, uidForShowChat]);

  return (
    <div className={styles.chatHeader}>
      <div
        className={styles.chatHeaderLeft}
        data-tooltip="Закрыть чат"
        onClick={closeChat}
      >
        <div className={styles.closeChat}>
          <img className={styles.closeChatImg} src={closeImg} alt="close" />
          <div className={styles.closeChatText}>Назад</div>
        </div>
      </div>
      <div className={styles.chatHeaderMiddle}>{user}</div>
      <div className={styles.chatHeaderRight}>
        <div className={styles.wrapperRight}>
          <img src={userPhoto || defaultImg} alt="userPhoto" />
        </div>
      </div>
    </div>
  );
};

export { ChatHeader };

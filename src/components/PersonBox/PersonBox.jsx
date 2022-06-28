import { useState, useEffect } from "react";

// Store
import { useDispatch, useSelector } from "react-redux";
import { modalUserAction } from "../../store/slice/modalUser";

// Components
import miniUserIcon from "../../img/miniUserIcon.png";
import messageIcon from "../../img/messageIcon.svg";
import { UserPhoto } from "../UserPhoto";

// Style
import styles from "./PersonBox.module.scss";

// Firebase
import { storage } from "../../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  listAll,
} from "firebase/storage";

const PersonBox = ({ firstName, lastName, department, uid }) => {
  const [userIcon, setUserIcon] = useState(null);

  const { isMobileSize } = useSelector((state) => state.mobile);

  const dispatch = useDispatch();

  const showUserInModal = () => {
    if (isMobileSize) {
      dispatch(modalUserAction.setShowModal(true));
      dispatch(modalUserAction.setUID(uid));
      return;
    }
    dispatch(modalUserAction.setUID(uid));
  };

  useEffect(() => {
    // console.log(uid);
    // getDownloadURL(ref(storage, `avatars/KUQq5TJySHWuTxNno0pvcUDxsl52`))
    //   .then
    //   (url) => console.log(url)
    //   ();
  }, []);

  return (
    <div className={styles.personBox}>
      <div className={styles.infoUser} onClick={showUserInModal}>
        <UserPhoto size="s" src={userIcon} />

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

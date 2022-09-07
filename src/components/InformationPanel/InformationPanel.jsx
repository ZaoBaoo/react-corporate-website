// Components
import { TypographyMain } from "../TypographyMain";
import { ButtonLogin } from "../ButtonLogin";
import { UserPhoto } from "../UserPhoto";

// Module css
import styles from "./InformationPanel.module.scss";

// Store
import { useDispatch, useSelector } from "react-redux";
import { modalUserAction } from "../../store/slice/modalUser";

// Firebase
import { auth } from "../../firebase";
import { loginAction } from "../../store/slice/loginSlice";
import { userDBAction } from "../../store/slice/userDBSlice";
import { registrationAction } from "../../store/slice/registrationSlice";

// Test icon
import photo from "../../img/userIcon.svg";

// Animate
import { motion } from "framer-motion";

const InformationPanel = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userDB);
  const { isMobileSize } = useSelector((state) => state.mobile);

  // (f)
  const showUserInModal = () => {
    if (isMobileSize) {
      dispatch(modalUserAction.setShowModal(true));
      dispatch(modalUserAction.setUIDForShowUserPage(userData.uid));
      return;
    }
    dispatch(modalUserAction.setUIDForShowUserPage(userData.uid));
  };

  // (f)
  const LogOut = () => {
    auth.signOut();
    dispatch(loginAction.loginHandler(false));
    dispatch(userDBAction.clearUserData());
    dispatch(registrationAction.clearDataStore());
    console.log("Вышли");
  };

  return (
    <div className={styles.boxWrapper}>
      <motion.div
        className={styles.boxInformation}
        onClick={showUserInModal}
        initial={{ x: 0 }}
        whileHover={{ x: "0.5rem" }}
      >
        {userData && (
          <>
            <UserPhoto size="m" src={userData.urlAvatar || photo} />
            <TypographyMain
              text={`${userData?.firstName} ${userData?.lastName}`}
              second={userData?.email}
              size="m"
            />
          </>
        )}
      </motion.div>
      <ButtonLogin mode="logout" type="button" onClick={LogOut} />
    </div>
  );
};

export { InformationPanel };

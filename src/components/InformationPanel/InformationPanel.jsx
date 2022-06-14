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
import userIcon from "../../img/userIcon.png";

const InformationPanel = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userDB);
  const { isMobileSize } = useSelector((state) => state.mobile);

  // (f)
  const showUserInModal = () => {
    if (isMobileSize) {
      dispatch(modalUserAction.setShowModal(true));
      dispatch(modalUserAction.setUID(userData.uid));
      return;
    }
    dispatch(modalUserAction.setUID(userData.uid));
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
      <div className={styles.boxInformation} onClick={showUserInModal}>
        <UserPhoto size="m" src={userIcon} />
        {userData && (
          <TypographyMain
            text={`${userData?.firstName} ${userData?.lastName}`}
            second={userData?.email}
            size="m"
          />
        )}
      </div>
      <ButtonLogin mode="logout" type="button" onClick={LogOut} />
    </div>
  );
};

export { InformationPanel };

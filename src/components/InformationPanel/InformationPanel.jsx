// Components
import { TypographyMain } from "../TypographyMain";
import { ButtonLogin } from "../ButtonLogin";

// Module css
import styles from "./InformationPanel.module.scss";

// Store
import { useDispatch, useSelector } from "react-redux";

// Firebase
import { auth } from "../../firebase";
import { loginAction } from "../../store/slice/loginSlice";
import { userDBAction } from "../../store/slice/userDBSlice";

// Test icon
import userIcon from "../../img/userIcon.png";

const InformationPanel = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userDB);
  // (f)
  const LogOut = () => {
    auth.signOut();
    dispatch(loginAction.loginHandler(false));
    dispatch(userDBAction.clearUserData());
    console.log("Вышли");
  };

  return (
    <div className={styles.boxWrapper}>
      <div className={styles.boxInformation}>
        <img src={userIcon} alt="" className={styles.icon} />
        <div className={styles.text}>
          <div>
            <TypographyMain size="s" color="light">
              {userData?.firstName}
            </TypographyMain>
            &nbsp;&nbsp;
            <TypographyMain size="s" color="light">
              {userData?.lastName}
            </TypographyMain>
          </div>
          <TypographyMain size="l" color="dark">
            {userData?.email}
          </TypographyMain>
        </div>
      </div>
      <ButtonLogin mode="logout" type="button" onClick={LogOut} />
    </div>
  );
};

export { InformationPanel };

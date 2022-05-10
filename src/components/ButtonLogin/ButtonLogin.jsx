import cn from "classnames";
import styles from "./ButtonLogin.module.scss";

const ButtonLogin = ({ type, name, mode, onClick = Function.prototype }) => {
  return (
    <button
      type={type}
      className={cn(styles.btnReset, {
        [styles.btnLogin]: mode === "login",
        [styles.btnRegistration]: mode === "registration",
        [styles.btnLogout]: mode === "logout",
      })}
      onClick={onClick}
    >
      <span>{name}</span>
    </button>
  );
};

export { ButtonLogin };

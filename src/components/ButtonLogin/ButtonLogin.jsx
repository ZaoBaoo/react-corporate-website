import cn from "classnames";
import styles from "./ButtonLogin.module.scss";

const ButtonLogin = ({ type, name, mode }) => {
  return (
    <button
      type={type}
      className={cn(styles.btnReset, {
        [styles.btnLogin]: mode === "login",
        [styles.btnRegistration]: mode === "registration",
      })}
    >
      <span>{name}</span>
    </button>
  );
};

export { ButtonLogin };

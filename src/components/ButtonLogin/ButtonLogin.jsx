import cn from "classnames";
import { forwardRef } from "react";
import styles from "./ButtonLogin.module.scss";

import { FallingLines } from "react-loader-spinner";

const ButtonLogin = forwardRef(
  ({ type, name, mode, onClick = Function.prototype, loading }, ref) => {
    return (
      <button
        type={type}
        className={cn(styles.btnReset, {
          [styles.btnLogin]: mode === "login",
          [styles.btnRegistration]: mode === "registration",
          [styles.btnLogout]: mode === "logout",
        })}
        onClick={onClick}
        ref={ref}
        disabled={loading}
      >
        <span style={loading ? { color: "transparent" } : null}>{name}</span>
        {loading && (
          <FallingLines
            color="#838eb9"
            wrapperClass={styles.spin}
            ariaLabel="oval-loading"
            strokeWidth={1}
            strokeWidthSecondary={1}
          />
        )}
      </button>
    );
  }
);

export { ButtonLogin };

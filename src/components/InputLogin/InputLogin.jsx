import cn from "classnames";
import styles from "./InputLogin.module.scss";
// import "material-design-icons/iconfont/material-icons.css";

const InputLogin = ({
  label,
  type,
  mode,
  register = Function.prototype,
  name,
  errors,
  val,
  iconEyeToggle,
  ...props
}) => {
  return (
    <div
      className={cn(styles.inputReset, {
        [styles.inputBorder]: mode === "inputBorder",
        [styles.inputLine]: mode === "inputLine",
      })}
    >
      <label>
        <input {...register(name, val)} type={type} {...props} required />

        <span>{label}</span>
        {errors?.[name] && (
          <div className={styles.error}>
            {errors?.[name].message || "Заполнено неправильно"}
          </div>
        )}
      </label>

      {iconEyeToggle && (
        <i
          className="material-icons"
          onClick={() => {
            iconEyeToggle((state) => !state);
          }}
        >
          remove_red_eye
        </i>
      )}
    </div>
  );
};

export { InputLogin };

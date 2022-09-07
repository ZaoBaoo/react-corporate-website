import cn from "classnames";
import styles from "./InputLogin.module.scss";

const InputLogin = ({
  label,
  type,
  mode,
  register = Function.prototype,
  name,
  val,
  iconEyeToggle,
  errors,
  refButtonNextPage,
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
        <input
          {...register(name, val)}
          type={type}
          {...props}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              refButtonNextPage.current.click();
            }
          }}
          required
        />

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

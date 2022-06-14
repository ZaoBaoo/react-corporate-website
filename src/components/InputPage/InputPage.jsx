// Style
import styles from "./InputPage.module.scss";
import cn from "classnames";

const InputPage = ({ mode, color, text, label, ...props }) => {
  return (
    <>
      {mode === "withoutLabel" && (
        <input
          {...props}
          value={text}
          className={cn({
            [styles.name]: color === "light",
            [styles.email]: color === "dark",
          })}
          maxLength="25"
          type="text"
        />
      )}

      {mode === "withLabel" && (
        <label className={styles.label}>
          <span>{label}</span>
          <input
            {...props}
            value={text}
            // maxLength="25"
            maxLength="18"
            type="text"
          />
        </label>
      )}
    </>
  );
};

export { InputPage };

// `${userData.firstName} ${userData.lastName}`

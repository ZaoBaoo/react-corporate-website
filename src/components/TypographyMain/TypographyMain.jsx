import styles from "./TypographyMain.module.scss";
import cn from "classnames";

const TypographyMain = ({ text, second, size }) => {
  return (
    <div className={styles.wrapper}>
      <span
        className={cn({
          [styles.lText]: size === "l",
          [styles.mText]: size === "m",
        })}
      >
        {text}
      </span>
      <span
        className={cn({
          [styles.lSecond]: size === "l",
          [styles.mSecond]: size === "m",
        })}
      >
        {second}
      </span>
    </div>
  );
};

export { TypographyMain };

import styles from "./TypographyMain.module.scss";
import cn from "classnames";

const TypographyMain = ({ children, size, color }) => {
  return (
    <span
      className={cn(styles.text, {
        [styles.s]: size === "s",
        [styles.l]: size === "l",
        [styles.light]: color === "light",
        [styles.dark]: color === "dark",
      })}
    >
      {children}
    </span>
  );
};

export { TypographyMain };

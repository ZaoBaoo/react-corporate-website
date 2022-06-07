import cn from "classnames";

import styles from "./UserPhoto.module.scss";

const UserPhoto = ({ size, src }) => {
  return (
    <div
      className={cn({
        [styles.l]: size === "l",
        [styles.m]: size === "m",
        [styles.s]: size === "s",
      })}
    >
      <img src={src} alt="" className={styles.img} />
    </div>
  );
};

export { UserPhoto };

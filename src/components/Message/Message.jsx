import React from "react";
import cn from "classnames";

// Styles
import styles from "./Message.module.scss";

const Message = (props) => {
  const { position, text, date } = props;
  return (
    <div
      className={cn({
        [styles.messageLeft]: position === "left",
        [styles.messageRight]: position === "right",
      })}
    >
      <div className={styles.messageBlock}>
        <div className={styles.messageText}>{text}</div>
        <div className={styles.messageDate}>{date}</div>
      </div>
    </div>
  );
};

export { Message };

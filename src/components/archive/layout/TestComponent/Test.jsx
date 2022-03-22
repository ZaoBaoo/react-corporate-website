import React from "react";
import styles from "./Test.module.scss";

const Test = () => {
  return (
    <div className={styles.login}>
      <div className={styles.groupInput}>
        <div className={styles.wrapperInput}>
          <input className={styles.input} type="text" placeholder="Имя" />
        </div>
        <div className={styles.wrapperInput}>
          <input className={styles.input} type="text" placeholder="Фамилия" />
        </div>
      </div>
    </div>
  );
};

export default Test;

import styles from "./Login.module.scss";

const Login = () => {
  return (
    <div className={styles.blockWrapper}>
      <div className={styles.groupInput}>
        <input type="text" />
      </div>
    </div>
  );
};

export { Login };

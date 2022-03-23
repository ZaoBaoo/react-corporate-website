import styles from "./InputLogin.module.scss";

const InputLogin = ({ label }) => {
  return (
    <div className={styles.blockInput}>
      <label>
        <input type="text" />
        <span>{label}</span>
      </label>
    </div>
  );
};

export { InputLogin };

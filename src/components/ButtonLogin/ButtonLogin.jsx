import styles from "./ButtonLogin.module.scss";

const ButtonLogin = ({ name }) => {
  return (
    <button type="button" className={styles.btn}>
      {name}
    </button>
  );
};

export { ButtonLogin };

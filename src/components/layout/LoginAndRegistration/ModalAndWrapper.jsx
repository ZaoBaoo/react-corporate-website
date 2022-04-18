import styles from "./LoginAndRegistration.module.scss";

const ModalAndWrapper = ({ children }) => {
  return (
    <div className={styles.blockWrapper}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
};

export { ModalAndWrapper };

// Components
import styles from "./RightSide.module.scss";

const RightSide = () => {
  return (
    <>
      <div className={styles.rightSide}>
        <div className={styles.userPanel}>
          <div className={styles.headerUserPanel}>
            <div>photo</div>
          </div>
          <hr />
          <div className={styles.mainUserPanel}>MAIN</div>
        </div>
      </div>
    </>
  );
};

export { RightSide };
